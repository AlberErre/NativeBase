import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ListView, ViewPropTypes, StyleSheet } from "react-native";

import { connectStyle } from "native-base-shoutem-theme";
import mapPropsToStyleNames from "../utils/mapPropsToStyleNames";

class Card extends Component {

  styleChildren(style) {
    let children = React.Children.map(this.props.children, (item, index) => {
      let cardStyle;
      if (index === 0) {
        if (!item.props.style && !Array.isArray(this.props.children)) {
          cardStyle = { borderTopLeftRadius: (style.borderTopLeftRadius || style.borderRadius), borderTopRightRadius: (style.borderTopRightRadius || style.borderRadius), borderBottomLeftRadius: (style.borderBottomLeftRadius || style.borderRadius), borderBottomRightRadius: (style.borderBottomRightRadius || style.borderRadius) }
        } else if (!item.props.style) {
          cardStyle = { borderTopLeftRadius: (style.borderTopLeftRadius || style.borderRadius), borderTopRightRadius: (style.borderTopRightRadius || style.borderRadius) }
        }
        return React.cloneElement(item, { style: cardStyle })
      } else if (index === (this.props.children.length - 1)) {
        cardStyle = { borderBottomLeftRadius: (style.borderBottomLeftRadius || style.borderRadius), borderBottomRightRadius: (style.borderBottomRightRadius || style.borderRadius) }
        return React.cloneElement(item, { style: cardStyle })
      }
      return item;
    })
    return children;
  }

  render() {
    if (this.props.dataArray && this.props.renderRow) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      const dataSource = ds.cloneWithRows(this.props.dataArray);
      return (
        <ListView
          {...this.props}
          enableEmptySections
          dataSource={dataSource}
          renderRow={this.props.renderRow}
        />
      );
    }

    let children = this.props.children;
    let style = StyleSheet.flatten(this.props.style);

    if (style && !isNaN((style.borderRadius || style.borderTopLeftRadius || style.borderTopRightRadius || style.borderBottomLeftRadius || style.borderBottomRightRadius))) {
      children = this.styleChildren(style);
    }

    return (
      <View ref={c => (this._root = c)} {...this.props}>
        {children}
      </View>
    );
  }
}

Card.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  dataArray: PropTypes.array,
  renderRow: PropTypes.func
};

const StyledCard = connectStyle("NativeBase.Card", {}, mapPropsToStyleNames)(
  Card
);

export { StyledCard as Card };
