import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree, { getFlatDataFromTree, getTreeFromFlatData, addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

class App extends Component {
  constructor(props) {
    super(props);
    this.steve = React.createRef();

    this.state = {
      treeData: getTreeFromFlatData({
        flatData: props.flattree.map(node => ({ ...node, title: node.name, subtitle: node.subtitle })),
        getKey: node => node.id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key
        rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
      }),
    };
  }

  getData() {
    return getFlatDataFromTree({
      treeData: this.state.treeData,
      getNodeKey: ({ node }) => node.id, // This ensures your "id" properties are exported in the path
      ignoreCollapsed: false, // Makes sure you traverse every node in the tree, not just the visible ones
    }).map(({ node, path }) => ({
      id: node.id,
      name: node.name,
      subtitle: node.subtitle,

      // The last entry in the path is this node's key
      // The second to last entry (accessed here) is the parent node's key
      parent: path.length > 1 ? path[path.length - 2] : null,
    }));
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div style={{ height: 800 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          generateNodeProps={({ node, path }) => ({
            title: (
              <input
                value={node.name}
                onChange={event => {
                  const name = event.target.value;

                  this.setState(state => ({
                    treeData: changeNodeAtPath({
                      treeData: state.treeData,
                      path,
                      getNodeKey,
                      newNode: { ...node, name },
                    }),
                  }));
                }}
              />
            ),
            subtitle: (
              <input
                value={node.subtitle}
                onChange={event => {
                  const subtitle = event.target.value;

                  this.setState(state => ({
                    treeData: changeNodeAtPath({
                      treeData: state.treeData,
                      path,
                      getNodeKey,
                      newNode: { ...node, subtitle },
                    }),
                  }));
                }}
              />
            ),
            buttons: [
              <button
                className="st-btn add-child"
                onClick={() =>
                  this.setState(state => ({
                    treeData: addNodeUnderParent({
                      treeData: state.treeData,
                      parentKey: path[path.length - 1],
                      expandParent: true,
                      getNodeKey,
                      newNode: {
                        name: '',
                        subtitle: ''
                      },
                      addAsFirstChild: state.addAsFirstChild,
                    }).treeData,
                  }))
                }
              >
              </button>,
              <button
                className="st-btn remove-child"
                onClick={() =>
                  this.setState(state => ({
                    treeData: removeNodeAtPath({
                      treeData: state.treeData,
                      path,
                      getNodeKey,
                    }),
                  }))
                }
              >
              </button>,
            ],
          })}
        />
      </div>
    );
  }
};

var nodes = [];

export const ReactContentRenderer = {
  unmountAll: function() {
    if (nodes.length === 0) {
      return;
    }
    nodes.forEach(node => React.unmountComponentAtNode(node));
    nodes = [];
  },
  unmount: function(node) {
    React.unmountComponentAtNode(node)
  },
  /**
   * Creates, renders and returns a React element created
   * from component class using given props and rendered
   * into the targetNode.
   */
  render: function(props, targetNode, callback) {
    var reactElement = React.createElement(App, props, null);
    var reactComponent = ReactDOM.render(reactElement, targetNode, callback);
    nodes.push(targetNode);
    return reactComponent;
  }
};