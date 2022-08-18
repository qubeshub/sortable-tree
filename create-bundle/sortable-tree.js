import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree, { getFlatDataFromTree, getTreeFromFlatData } from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

class App extends Component {
  constructor(props) {
    super(props);
    this.steve = React.createRef();

    this.state = {
      treeData: getTreeFromFlatData({
        flatData: props.flattree.map(node => ({ ...node, title: node.name })),
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

      // The last entry in the path is this node's key
      // The second to last entry (accessed here) is the parent node's key
      parent: path.length > 1 ? path[path.length - 2] : null,
    }));
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
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