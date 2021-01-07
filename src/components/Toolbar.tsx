import React, { useState } from "react";
import {
  Alert,
  Button,
  ButtonToolbar,
  Content,
  ControlLabel,
  Divider,
  FlexboxGrid,
  Form,
  FormGroup,
  Icon,
  IconButton,
  Notification,
  Panel,
  Toggle,
} from "rsuite";
import ColorPicker from "rsuite-color-picker";
import Grid from "./Grid";

function Toolbar() {
  const [gridRows, setGridRows] = useState("10");
  const [gridColumns, setGridColumns] = useState("30");
  const [placeholderCol, setPlaceholderCol] = useState("");
  const [placeholderRow, setPlaceholderRow] = useState("");
  const [colour, setColour] = useState("#00BCD4");
  const [toolButtons, setToolButtons] = useState({ pen: true, bucket: false });
  const [showGrid, setShowGrid] = useState(false);
  const [resetGrid, setResetGrid] = useState(false);

  function open() {
    Notification["warning"]({
      title: "Warning",
      duration: 10000000000,
      description: (
        <div>
          <p>Changing the grid will erase your artwork</p>
          <br />
          <ButtonToolbar>
            <Button
              onClick={() => {
                //check to make sure that the end user does not enter an unrealistic grid size
                if (
                  parseInt(placeholderCol) <= 0 ||
                  parseInt(placeholderCol) > 100 ||
                  parseInt(placeholderRow) > 100 ||
                  parseInt(placeholderCol) <= 0 ||
                  placeholderRow === "" ||
                  placeholderCol === ""
                ) {
                  setGridRows("10");
                  setGridColumns("30");
                  Alert.error(
                    "Invalid grid dimensions. Defaulting to a 10x30 grid",
                    5000
                  );
                } else {
                  setGridColumns(placeholderCol);
                  setGridRows(placeholderRow);
                }

                setResetGrid(!resetGrid);
                Notification.close();
              }}
            >
              Continue
            </Button>
            <Button
              onClick={() => {
                Notification.close();
              }}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </div>
      ),
    });
  }

  const handleSwitch = (event: boolean) => {
    setShowGrid(event);
  };

  return (
    <Content style={{ marginTop: "25px" }}>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={20}>
          <Panel header={<h3>MS Paint Clone</h3>} bordered>
            <Form layout="inline">
              <FormGroup>
                <ControlLabel srOnly>Rows</ControlLabel>
                <input
                  max={100}
                  min={1}
                  type="number"
                  placeholder="Rows"
                  name="rows"
                  style={{ width: 100, height: 20 }}
                  onChange={(event) => {
                    setPlaceholderRow(event.target.value);
                  }}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel srOnly>Width</ControlLabel>
                <input
                  max={100}
                  min={1}
                  type="number"
                  placeholder="Columns"
                  name="columns"
                  style={{ width: 100, height: 20 }}
                  onChange={(event) => setPlaceholderCol(event.target.value)}
                />
              </FormGroup>
              <Button size={"xs"} onClick={open}>
                Set Grid
              </Button>
              <Toggle
                size="xs"
                checkedChildren="Show Grid"
                unCheckedChildren="Hide Grid"
                onChange={(checked) => handleSwitch(checked)}
              />
            </Form>

            <FormGroup>
              <ColorPicker
                disableAlpha={true}
                defaultValue={"#00BCD4"}
                onChangeComplete={(color) => {
                  setColour(color.hex);
                }}
              />
            </FormGroup>
            <FormGroup>
              <IconButton
                icon={<Icon icon="pencil" />}
                style={{ marginRight: 5 }}
                onClick={() => {
                  setToolButtons({ pen: true, bucket: false });
                  Alert.info("Pencil tool selected");
                }}
              />
              <IconButton
                icon={
                  <Icon
                    icon="bitbucket"
                    onClick={() => {
                      setToolButtons({ pen: false, bucket: true });
                      Alert.info("Bucket tool selected");
                    }}
                  />
                }
              />
            </FormGroup>
            <Divider />
            <Grid
              gridRows={gridRows}
              gridColumns={gridColumns}
              colour={colour}
              toolButtons={toolButtons}
              showGrid={showGrid}
              resetGrid={resetGrid}
            />
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Content>
  );
}

export default Toolbar;
