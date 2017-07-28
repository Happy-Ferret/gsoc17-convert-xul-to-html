(function() {
  const { connect } = ReactRedux;
  const { bindActionCreators } = Redux;

  const WhatToPrint = ({ state, actions }) => {
    const { printEvents, printTasks, toDate, fromDate, view } = state;
    const { toggleEventsShow, toggleTasksShow, changeView, changeFromDate, changeToDate } = actions;
    return React.createElement(
      Fieldset,
      { title: "What to Print", id: "what-to-print-group" },
      React.createElement(
        "div",
        { className: "fieldset-content-wrapper" },
        React.createElement(
          "div",
          { className: "row row-align-content" },
          React.createElement("input", {
            className: "row-input checkbox",
            type: "checkbox",
            id: "events",
            checked: printEvents,
            onChange: toggleEventsShow
          }),
          React.createElement(
            "label",
            { htmlFor: "events", className: "row-label mar-right-15" },
            "Events"
          ),
          React.createElement("input", {
            className: "row-input checkbox",
            type: "checkbox",
            id: "tasks",
            checked: printTasks,
            onChange: toggleTasksShow
          }),
          React.createElement("label", { htmlFor: "tasks", className: "row-label" }, "Tasks")
        ),
        React.createElement(
          "div",
          { className: "row row-label-expanded" },
          React.createElement("input", {
            className: "row-input checkbox",
            name: "to-print",
            type: "radio",
            id: "printCurrentView",
            value: "CURRENT_VIEW",
            checked: view === "CURRENT_VIEW",
            onChange: changeView
          }),
          React.createElement(
            "label",
            { htmlFor: "printCurrentView", className: "row-label" },
            "Current view"
          )
        ),
        React.createElement(
          "div",
          { className: "row row-label-expanded" },
          React.createElement("input", {
            className: "row-input checkbox",
            type: "radio",
            name: "to-print",
            id: "selected",
            value: "SELECTED_EVENTS/TASKS",
            checked: view === "SELECTED_EVENTS/TASKS",
            onChange: changeView
          }),
          React.createElement(
            "label",
            { htmlFor: "selected", className: "row-label" },
            "Selected events/tasks"
          )
        ),
        React.createElement(
          "div",
          { className: "row row-label-expanded" },
          React.createElement("input", {
            className: "row-input checkbox",
            type: "radio",
            name: "to-print",
            id: "custom-range",
            value: "CUSTOM_DATE_RANGE",
            checked: view === "CUSTOM_DATE_RANGE",
            onChange: changeView
          }),
          React.createElement(
            "label",
            { htmlFor: "custom-range", className: "row-label" },
            "Custom date range"
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "label",
            { htmlFor: "start-date-picker", className: "row-label" },
            "From:"
          ),
          React.createElement("input", {
            type: "date",
            id: "start-date-picker",
            className: "row-input",
            value: fromDate,
            onChange: changeFromDate
          })
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "label",
            { htmlFor: "end-date-picker", className: "row-label" },
            "To:"
          ),
          React.createElement("input", {
            type: "date",
            id: "end-date-picker",
            className: "row-input",
            value: toDate,
            onChange: changeToDate
          })
        )
      )
    );
  };

  WhatToPrint.propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  const mapStateToProps = ({ whatToPrint }) => ({ state: whatToPrint });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(window.__what_to_print_actions__, dispatch)
  });

  window.WhatToPrint = connect(mapStateToProps, mapDispatchToProps)(WhatToPrint);
})();
