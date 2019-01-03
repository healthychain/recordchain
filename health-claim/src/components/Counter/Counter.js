//@flow

import * as React from "react";
import CountUp from "react-countup";
import classNames from "classnames";

import "./Counter.scss";

type Props = {
  currentValue: Number,
  previousValue: Number,
  duration: Number
};

class StatTicker extends React.Component<Props> {
  render() {
    const { previousValue, currentValue, duration } = this.props;
    return (
      <CountUp
        key={`${previousValue}-${currentValue}`}
        start={previousValue}
        end={currentValue}
        duration={duration}
        className={classNames("display", this.props.className)}
        formattingFn={value => {
          if (!value) return "";
          const valueString = value.toString();
          const separatorOffset = valueString.length % 3;
          return valueString
            .split("")
            .map((char, idx) => {
              return `<span class="${classNames("char", {
                ["separator"]: (idx + 2 - separatorOffset) % 3 === 0
              })}">${char}</span>`;
            })
            .join("");
        }}
      />
    );
  }
}

export default StatTicker;
