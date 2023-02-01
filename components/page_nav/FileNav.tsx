import React, {useState} from "react";
import type {MenuProps} from "antd";
import {Menu} from "antd";

const items: MenuProps["items"] = [
    {
        label: "File",
        key: "#MenuFile",
        children: [
                {
                    label: "New Exercise",
                    key: "file:new",
                },
                {
                    label: "Open Exercise",
                    key: "file:open",
                },
                {
                    label: "Close Exercise",
                    key: "file:close",
                },
                {
                    label: "Administrative",
                    key: "file:administrative",
                    disabled: true
                },
                {
                    label: "Print",
                    key: "file:print",
                    disabled: true
                },
                {
                    label: "Exit",
                    key: "file:exit",
                },

        ],
    },
    {
        label: "Edit",
        key: "#MenuEdit",
        children: [
            {
                label: "Undo",
                key: "edit:undo",
                disabled: true
            },
            {
                label: "Cut",
                key: "edit:cut",
                disabled: true
            },
            {
                label: "Copy All",
                key: "edit:copy_all",
                disabled: true
            },
            {
                label: "Paste",
                key: "edit:paste",
                disabled: true
            },
            {
                label: "Clear",
                key: "edit:clear",
                disabled: true
            },
        ],
    },
    {
        label: "Plan",
        key: "#MenuPlan",
        children: [
            {
                label: "Calendar",
                key: "plan:calendar",
            },
            {
                label: "Clock",
                key: "plan:clock",
            },
            {
                label: "Clock Settings",
                key: "plan:clock_settings",
            },
            {
                label: "Product Planner",
                key: "plan:product_planner",
            },
            {
                label: "Rate Planner",
                key: "plan:rate_planner",
            },
            {
                label: "Group Planner",
                key: "plan:group_planner",
            },
            {
                label: "Information Services",
                key: "plan:info_services",
                disabled: true
            },
            {
                label: "Vital Statistics",
                key: "plan:vital_stats",
                disabled: true
            },
        ],
    },
    {
        label: "Report",
        key: "#MenuReport",
        children: [
            {
                label: "Maintenance Report",
                key: "report:maintenance"
            },
            {
                label: "Entertainment Report",
                key: "report:entertainment"
            },
            {
                label: "Staffing Report",
                key: "report:staffing"
            },
            {
                label: "Room Supplies Report",
                key: "report:room_supplies"
            },
            {
                label: "Laundry & Linen Report",
                key: "report:laundry_linen"
            },
            {
                label: "Room Attendant Report",
                key: "report:room_attendant"
            },
            {
                label: "Commissions Report",
                key: "report:commissions"
            },
            {
                label: "Advertising Report",
                key: "report:advertising"
            }
        ]
    },
    {
        label: "Chart",
        key: "#MenuChart",
        children: [
            {
                label: "Revenue by Segment",
                key: "chart:revenue_by_segment"
            },
            {
                label: "Rooms Sold by Segment",
                key: "chart:rooms_sold_by_segment"
            },
            {
                label: "Margin by Segment",
                key: "chart:margin_by_segment"
            },
            {
                label: "Commitments",
                key: "chart:commitments"
            },
            {
                label: "Rates Reserved",
                key: "chart:rates_reserved"
            },
            {
                label: "Rates Declined",
                key: "chart:rates_declined"
            },
            {
                label: "Rates Revenue",
                key: "chart:rates_revenue"
            },
            {
                label: "Buildup",
                key: "chart:buildup",
                disabled: true
            },
            {
                label: "Time Animation",
                key: "chart:time_animation",
                disabled: true
            },
            {
                label: "Rotation Animation",
                key: "chart:rotation_animation",
                disabled: true
            },
            {
                label: "Filter Segments",
                key: "chart:filter_segments",
                disabled: true
            }
        ]
    },
    {
        label: "Help",
        key: "#MenuHelp",
        children: [
            {
                label: "Participant Guide",
                key: "help:participant_guide",
                disabled: true
            },
            {
                label: "About Hotel Simulation",
                key: "help:hotel_simulation",
                disabled: true
            }
        ]
    }
];

export default function FileNav () {
    const [current, setCurrent] = useState("mail");

    const onClick: MenuProps["onClick"] = e => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};