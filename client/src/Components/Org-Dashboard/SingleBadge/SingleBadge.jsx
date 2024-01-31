import React from "react";
import ReactScrollableList from "react-scrollable-list";
import "./SingleBadge.css"

const SingleBadge = () => {
  const assigned_users = [
    {
      id: 1,
      content: "Dev",
    },
    {
      id: 2,
      content: "Dev",
    },
    {
      id: 3,
      content: "Dev",
    },
    {
      id: 4,
      content: "Dev",
    },
    {
      id: 5,
      content: "Dev",
    },
    {
      id: 6,
      content: "Dev",
    },
    {
      id: 7,
      content: "Dev",
    },
    {
      id: 9,
      content: "Dev",
    },
    {
      id: 10,
      content: "Dev",
    },
    {
      id: 11,
      content: "Dev",
    },
    {
      id: 12,
      content: "Dev",
    },
    {
      id: 13,
      content: "Dev",
    },
    {
      id: 14,
      content: "Dev",
    },
    {
      id: 15,
      content: "Dev",
    },
    {
      id: 16,
      content: "Dev",
    },
    {
      id: 17,
      content: "Dev",
    },
    {
      id: 18,
      content: "Dev",
    },
    {
      id: 19,
      content: "Dev",
    },
    {
      id: 20,
      content: "Dev",
    },
    {
      id: 21,
      content: "Dev",
    },
    {
      id: 22,
      content: "Dev",
    },
  ];

  return (
    <div>
      <div className="assigned-users">
        <ReactScrollableList
          listItems={assigned_users}
          heightOfItem={30}
          style={{ color: "white" }}
        />
      </div>
    </div>
  );
};

export default SingleBadge;
