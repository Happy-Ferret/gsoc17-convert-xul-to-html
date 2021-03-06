/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
  const { Provider } = ReactRedux;
  // redux_store will be available to acceptDialog
  // and message event listener by closure
  const redux_store = window.__configure_redux_store__();

  const sendMessageToParent = (msg, origin) => {
    // parent and window are same thing if the current page is not in any frame
    if (window !== parent) {
      parent.postMessage(msg, origin);
    }
  };

  window.addEventListener("message", e => {
    // extentions and other 3rd party scripts talk via postMeessage api(same orgin)
    // so it is very important to filter those events
    if (e.origin !== window.location.origin || !e.data || e.data.source !== "dialog-message") {
      return;
    }
    sendMessageToParent(
      { messageRecieved: true, source: "dialog-message" },
      `${window.location.origin}/iframe-testing-ground`
    );
    const state = Object.assign({}, e.data);
    // updating state with data sent via message event
    redux_store.dispatch(window.__global_actions__.updateItems(state));
  });

  ReactDOM.render(
    <Provider store={redux_store}>
      <CalendarAlarmDialog />
    </Provider>,
    document.getElementById("root")
  );
})();
