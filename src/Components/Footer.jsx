import React, { Component } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";

class Footer extends Component {
  render() {
    const { muscles, onSelect, category } = this.props;
    const index = category
      ? muscles.findIndex(group => group === category) + 1
      : 0;

    const onIndexSelect = (e, index) =>
      onSelect(index === 0 ? "" : muscles[index - 1]);

    return (
      <AppBar position="static">
        <Tabs
          value={index}
          onChange={onIndexSelect}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="All" />
          {muscles.map(group => (
            <Tab key={group} label={group} />
          ))}
        </Tabs>
      </AppBar>
    );
  }
}

export default Footer;
