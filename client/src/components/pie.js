import { useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ResponsivePie } from "@nivo/pie";

const useStyles = makeStyles((theme) => ({
  pie: {
    // flex: 2,
    display: "flex",
    justifyContent: "flex-end",
    // maxWidth: "40em",
    maxHeight: "40em",
    minHeight: "10em",
    margin: "0 2em",
    flex: 1,
  },
  tooltip: {
    backgroundColor: "#F3F4F6",
    padding: "1em",
    width: "1em",
  },
}));

const Pie = ({ socket }) => {
  const [data, setData] = useState([
    {
      id: "0",
      label: "0",
      value: 0,
    },
  ]);

  // useEffect(() => {
  //   socket.emit("get data", "test-question");
  // }, [])

  useEffect(() => {
    console.log("pie use effect data", data);
    socket.on("update chart", ({ questionId, newData }) => {
      console.log("update chart", questionId, newData);
      setData(newData);
    });

    // return () => {
    //   console.log("in pie cleanup");
    //   socket.close();
    // };
  }, [socket, data]);

  // socket.on("update chart", (msg) => {
  //   console.log("update chart", msg);
  //   setData(msg);
  // });

  const classes = useStyles();
  return (
    <Container className={classes.pie}>
      {/* // <div classNames={classes.pie}> */}
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 140, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "pastel1" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabel={(d) => d.label}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabel={(d) => `${d.id} (${d.value} votes)`}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: true,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 75,
            itemHeight: 30,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
        tooltip={({ datum: { data } }) => (
          <span
            className={classes.tooltip}
          >{`${data.value} vote(s) for ${data.id} story points`}</span>
        )}
      />
      {/* // </div> */}
    </Container>
  );
};

export default Pie;
