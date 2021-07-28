/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import Flex from 'components/shared-components/Flex'
import BasicInfo from "./ActivityInfo/BasicInfo";
import Schedule from "./ActivityInfo/Schedule";
import BookingLimits from "./ActivityInfo/BookingLimits";
import Gallery from "./ActivityInfo/Gallery";
import TimeSlots from "./ActivityInfo/TimeSlots";
import Price from "./ActivityInfo/Price";
import Transport from "./ActivityInfo/Transport";
import Food from "./ActivityInfo/Food";
import Amenities from "./ActivityInfo/Amenities";
import AdditionalInfo from "./ActivityInfo/AdditionalInfo";
import Tickets from "./ActivityInfo/Tickets";
import { Tabs } from 'antd';

const ActivityEdit = ({
    match: {
        params: { id },
    },
}) => {
    const [contentName, setContentName] = useState("BasicInfo");
    const { TabPane } = Tabs;

    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <Flex className="mb-1" mobileFlex={false}>
                    <h2>Edit User</h2>
                </Flex>
            </Flex>
            <div>
                <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
                    <TabPane tab="BasicInfo" key="1">
                        <BasicInfo setContentName={setContentName} editId={id}></BasicInfo>
                    </TabPane>
                    <TabPane tab="Schedule" key="2">
                        <Schedule setContentName={setContentName} editId={id}></Schedule>
                    </TabPane>
                    <TabPane tab="BookingLimits" key="3">
                        <BookingLimits setContentName={setContentName} editId={id}></BookingLimits>
                    </TabPane>
                    <TabPane tab="Gallery" key="4">
                        <Gallery setContentName={setContentName} editId={id}></Gallery>
                    </TabPane>
                    <TabPane tab="Timeslots" key="5">
                        <TimeSlots setContentName={setContentName} editId={id}></TimeSlots>
                    </TabPane>
                    <TabPane tab="Price" key="6">
                        <Price setContentName={setContentName} editId={id}></Price>
                    </TabPane>
                    <TabPane tab="Transports" key="7">
                        <Transport setContentName={setContentName} editId={id}></Transport>
                    </TabPane>
                    <TabPane tab="Food" key="8">
                        <Food setContentName={setContentName} editId={id}></Food>
                    </TabPane>
                    <TabPane tab="Amenities" key="9">
                        <Amenities setContentName={setContentName} editId={id}></Amenities>
                    </TabPane>
                    <TabPane tab="AdditionalInfo" key="10">
                        <AdditionalInfo setContentName={setContentName} editId={id}></AdditionalInfo>
                    </TabPane>
                    <TabPane tab="Tickets" key="11">
                        <Tickets setContentName={setContentName} editId={id}></Tickets>
                    </TabPane>
                </Tabs>
            </div>
        </Card>
    )
}

export default ActivityEdit
