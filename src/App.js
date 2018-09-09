import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon, Button, Table } from 'antd';
import './styleTable.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmailName: '',
            userFirstName: '',
            userLastName: '',
            userEditingId: '',

            // data: [
            //     {
            //         id: '1',
            //         email: 'dimunidze@mail.ru (Example)',
            //         first: 'Dmitriy(Example)',
            //         last: 'Kandrin (Example)',
            //         description: 'Phone: 8-902-219-93-44, To Shakurov Roman Azatovich, From Kandrin Dmitry Vladimirovich, status: Done',
            //     }
            // ],

            buttonClickReset: false,
            buttonClickCreate: false,
            buttonClickSave: false
        };
    }

    emitEmpty = () => {
        this.userEmailNameInput.focus();
        this.setState({ userEmailName: '' });
    };
    emitEmptyFirstName = () => {
        this.userFirstNameInput.focus();
        this.setState({ userFirstName: '' });
    };
    emitEmptyLastName = () => {
        this.userLastNameInput.focus();
        this.setState({ userLastName: '' });
    };

    onChangeUserEmailName = (e) => {
        this.setState({ userEmailName: e.target.value });
    };
    onChangeUserFirstName = (e) => {
        this.setState({ userFirstName: e.target.value });
    };
    onChangeUserLastName = (e) => {
        this.setState({ userLastName: e.target.value });
    };

    clickReset = (e) => {
        this.setState({ userEmailName: e.target.value });
        this.setState({ userFirstName: e.target.value });
        this.setState({ userLastName: e.target.value });
    };
    clickCreate = () => {
      this.setState(prevState => ({
        data: [...prevState.data, {
            id: prevState.data.reduce((lastIndex, item) => {
                if (+lastIndex <= +item.id) {
                    return (+item.id + 1) + '';
                }
                return lastIndex;
            }, '0'),
            email: prevState.userEmailName,
            first: prevState.userFirstName,
            last: prevState.userLastName,
            description: 'Phone: 8-902-219-93-44, To Shakurov Roman Azatovich, From Kandrin Dmitry Vladimirovich, status: Done'
        }],
            userEditingId: '',
            userEmailName: '',
            userFirstName: '',
            userLastName: '',
      }));
    };
    clickSave = () => {
        this.setState(prevState => {
            const id = prevState.userEditingId;
            const editingItemIndex = prevState.data.findIndex(item => item.id === id);

            return {
                data: [
                    ...prevState.data.slice(0, editingItemIndex),
                    {
                        email: prevState.userEmailName,
                        first: prevState.userFirstName,
                        id,
                        last: prevState.userLastName,
                        description: 'Phone: 8-902-219-93-44, To Shakurov Roman Azatovich, From Kandrin Dmitry Vladimirovich, status: Done'
                    },
                    ...prevState.data.slice(editingItemIndex + 1)
                ],
                userEmailName: '',
                userEditingId: '',
                userFirstName: '',
                userLastName: ''
            };
        })
    };
    clickEdit = (id) => {
        this.setState(prevState => {
            const { data } = prevState;
            const updatingItem = data.find(item => item.id === id);
            return {
                userEmailName: updatingItem.email,
                userFirstName: updatingItem.first,
                userLastName: updatingItem.last,
                userEditingId: updatingItem.id
            };
        });
    };
    clickAllDelete = () => {
        this.setState({
            data: [0],
        });
    };
    loadData = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                        {
                            id: '1',
                            email: 'dimunidze@mail.ru (Example)',
                            first: 'Dmitriy(Example)',
                            last: 'Kandrin (Example)',
                            description: 'Phone: 8-902-219-93-44, To Shakurov Roman Azatovich, From Kandrin Dmitry Vladimirovich, status: Done',
                        }
                    ])
                },
                2000)
        })
    };
    componentDidMount(){
        this.loadData().then(data => this.setState({data}))
    }

  render() {
      const { userEmailName } = this.state;
      const { userFirstName } = this.state;
      const { userLastName } = this.state;

      const un = userEmailName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
      const ufn = userFirstName ? <Icon type="close-circle" onClick={this.emitEmptyFirstName} /> : null;
      const uln = userLastName ? <Icon type="close-circle" onClick={this.emitEmptyLastName} /> : null;

      const columns = [
          { title: 'Id', dataIndex: 'id', key: 'id' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'First', dataIndex: 'first', key: 'first' },
          { title: 'Last', dataIndex: 'last', key: 'last' },
          { title: 'Action', dataIndex: 'id', key: 'id', render: (id) => <a onClick={() => this.clickEdit(id)}>Edit</a>},
      ];

      return (
          <div className="content">
          <Card title="Form" style={{ width: '100%', backgroundColor: 'rgb(245,255,250)'}}>
              <Input style = {{padding:'5px'}}
                  placeholder="Enter your Email"
                  prefix={<Icon type="mail" />}
                  suffix={un}
                  value={userEmailName}
                  onChange={this.onChangeUserEmailName}
                  ref={node => this.userEmailNameInput = node}
              />
              <Input style = {{padding:'5px'}}
                  placeholder="Enter your First Name"
                  prefix={<Icon type="user" />}
                  suffix={ufn}
                  value={userFirstName}
                  onChange={this.onChangeUserFirstName}
                  ref={node => this.userFirstNameInput = node}
              />
              <Input style = {{padding:'5px'}}
                  placeholder="Enter your Last Name"
                  prefix={<Icon type="user" />}
                  suffix={uln}
                  value={userLastName}
                  onChange={this.onChangeUserLastName}
                  ref={node => this.userLastNameInput = node}
              />

              <div style = {{padding:'5px'}}>
                  <Button type="primary" onClick={this.clickSave}>
                      <Icon type="save" />
                      Save
                  </Button>
                  <Button style = {{marginLeft:'5px'}} onClick={this.clickCreate}>
                      <Icon type="user-add" />
                      Create
                  </Button>
                  <Button type="danger" style = {{marginLeft:'5px'}} onClick={this.clickReset}>
                      <Icon type="close-square" />
                      Reset
                  </Button>
              </div>
          </Card>
              <Card title="User List" style={{ width: '100%', backgroundColor: 'rgb(245,255,250)', marginTop: '2%'}}>
              <div>
                  <div style = {{padding:'5px'}}>
                      <Button type="danger" style = {{marginLeft:'5px'}} onClick={this.clickAllDelete}>
                          <Icon type="close-circle" />
                          Delete all
                      </Button>
                  </div>
                  <Table
                      columns={columns}
                      expandedRowRender={record => <p>{record.description}</p>}
                      dataSource={this.state.data}
                  />
              </div>
              </Card>
          </div>
      );
  }
}

export default App;
