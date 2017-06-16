class DialogContentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: "general",
      tabs: {
        general: {
          disabled: false,
          forceDisabled: false,
          autoEnabled: false,
          color: "#deadbf",
          name: "Calendar",
          uri: "moz-storage-calendar://",
          readOnly: true,
          supressAlarms: false,
          canRefresh: false,
          refreshInterval: 30,
          cache: {
            supported: false,
            enabled: false,
            always: false
          },
          capabilities: {
            alarms: {
              popup: {
                supported: true
              }
            }
          },
          imip: {
            identity: {
              disabled: false,
              selected: "key1"
            }
          },
          identities: [
            {
              name: "Arshad <kewisch@exmaple.com>",
              key: "key2"
            },
            {
              name: "Philipp <kewisch@exmaple.com>",
              key: "key1"
            }
          ]
        },
        advanced: {
          disabled: true,
          forceDisabled: false,
          autoEnabled: false,
          color: "#deadbf",
          name: "Another Calendar",
          uri: "moz-storage-calendar://",
          readOnly: true,
          supressAlarms: false,
          canRefresh: false,
          refreshInterval: 30,
          cache: {
            supported: false,
            enabled: false,
            always: false
          },
          capabilities: {
            alarms: {
              popup: {
                supported: true
              }
            }
          },
          imip: {
            identity: {
              disabled: false,
              selected: "key1"
            }
          },
          identities: [
            {
              name: "Philipp <kewisch@exmaple.com>",
              key: "key1"
            }
          ]
        }
      }
    };

    // this.recieveMessage.bind(this) gives new reference every time
    // so declaring instance variable so that event can be removed
    // in componentWillUnmount lifecycle
    this.recieveMessage = this.recieveMessage.bind(this);
  }

  componentWillMount() {
    window.addEventListener("message", this.recieveMessage);
  }

  componentDidMount() {
    const stateData = JSON.parse(JSON.stringify(this.state.tabs));
    stateData.source = "dialog-message";
    setTimeout(() => {
      this.postMessage(stateData, `${window.location.origin}`);
    }, 20000);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.recieveMessage);
  }

  postMessage(msg, origin) {
    // parent and window are same thing if the current page is not in any frame
    if (window !== parent) {
      parent.postMessage(msg, origin);
    }
  }

  recieveMessage(e) {
    // extentions talk via postMeessage api(same orgin)
    // so it is very important to filter those events
    if (
      e.origin !== window.location.origin ||
      e.source !== window ||
      !e.data ||
      e.data.source !== "dialog-message"
    ) {
      console.log(`Blocked message event from ${e.origin} with data -`, e.data);
      return;
    }

    this.postMessage({ messageRecieved: true }, `${window.location.origin}/iframe-testing-ground`);

    console.log("%c Data from Parent: Starts", "color: #333; font-size: 20px; font-weight: bold");
    console.log(e.data);
    console.log("%c Data from Parent: Ends", "color: #333; font-size: 20px; font-weight: bold");

    const newTabState = Object.assign({}, e.data);
    this.setState({ tabs: newTabState });
  }

  changeTab(tabName) {
    this.setState({ activeTab: tabName });
  }

  changeState(tabState) {
    const activeTab = this.state.activeTab;
    const newActiveTabState = {};
    newActiveTabState[activeTab] = tabState;
    const newTabsState = Object.assign({}, this.state.tabs, newActiveTabState);
    this.setState({ tabs: newTabsState });
  }

  render() {
    const activeTabData = this.state.tabs[this.state.activeTab];
    const allTabsName = Object.keys(this.state.tabs).filter(elem => elem !== "source");
    const handleTabChange = this.changeTab.bind(this);
    const activeTab = this.state.activeTab;
    const showTabStrip = allTabsName.length > 1;
    const changeState = this.changeState.bind(this);

    return (
      <div className="wrapper" id="dialog-content-box">
        <TabBox>
          {showTabStrip &&
            <TabStrip tabs={allTabsName} handleTabChange={handleTabChange} activeTab={activeTab} />}
          <TabPanel activeTab={activeTab} activeTabData={activeTabData} changeState={changeState} />
        </TabBox>
      </div>
    );
  }
}

ReactDOM.render(<DialogContentBox />, document.getElementById("root"));