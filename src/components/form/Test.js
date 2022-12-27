import React, {Component, useState} from 'react';
import {TreeSelect} from "antd";
import {Modal, Form, ModalBody} from "react-bootstrap";

const {SHOW_PARENT} = TreeSelect;
const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
                children: []
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
                children: []
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
                children: []
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
                children: []
            },
        ],
    },
];

function Test() {
    const [value, setValue] = useState(['0-0-0']);
    const onChange = (newValue: string[]) => {
        console.log('onChange ', newValue);
        setValue(newValue);
    };

    const tProps = {
        treeData, value, onChange, treeCheckable: true, showCheckedStrategy: SHOW_PARENT, placeholder: 'Please select',
        style: {
            width: '100%',
        },
    };
    return (
        <div>
            <Modal show={true}>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3" controlId="formRoles">
                            <Form.Label>Danh sách quyền:
                                <span style={{"color": "red"}}>*</span>
                            </Form.Label>
                            <TreeSelect dropdownStyle={{zIndex: "10000"}} {...tProps} />
                            {/*{errors.appCode &&*/}
                            {/*<div className="validation" style={{"color": "red"}}>{errors.appCode}</div>}*/}
                        </Form.Group>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Test;