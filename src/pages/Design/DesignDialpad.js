import { Button } from "reactstrap";

const DesignDialpad = ({ tog_list, handleDialpadBtn, designs }) => {
  function handleNumber(number) {
    tog_list();
    handleDialpadBtn(number);
  }

  const alreadyExistingKeys = designs?.map((design) => {
    return design.key;
  });

  return (
    <div className="dialpad-container " style={{ width: "180px" }}>
      <div className="d-flex flex-column">
        <div className="dialpad-controls">
          <div className="dialpad-keys-row-container d-flex, flex-column">
            <div
              className="dialpad-key-row d-flex justify-content-between"
              style={{ marginBottom: "5px" }}
            >
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("1")}
                  disabled={alreadyExistingKeys.includes("1")}
                >
                  <span>1</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4 d-flex flex-column justify-content-center align-items-center"
                  onClick={() => handleNumber("2")}
                  disabled={alreadyExistingKeys.includes("2")}
                >
                  <span>2</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("3")}
                  disabled={alreadyExistingKeys.includes("3")}
                >
                  <span>3</span>
                </Button>
              </div>
            </div>

            <div
              className="dialpad-key-row d-flex justify-content-between"
              style={{ marginBottom: "5px" }}
            >
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("4")}
                  disabled={alreadyExistingKeys.includes("4")}
                >
                  <span>4</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("5")}
                  disabled={alreadyExistingKeys.includes("5")}
                >
                  <span>5</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("6")}
                  disabled={alreadyExistingKeys.includes("6")}
                >
                  <span>6</span>
                </Button>
              </div>
            </div>
            <div
              className="dialpad-key-row d-flex justify-content-between"
              style={{ marginBottom: "5px" }}
            >
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("7")}
                  disabled={alreadyExistingKeys.includes("7")}
                >
                  <span>7</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("8")}
                  disabled={alreadyExistingKeys.includes("8")}
                >
                  <span>8</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("9")}
                  disabled={alreadyExistingKeys.includes("9")}
                >
                  <span>9</span>
                </Button>
              </div>
            </div>
            <div className="dialpad-key-row d-flex justify-content-between">
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("*")}
                  disabled={alreadyExistingKeys.includes("*")}
                >
                  <span>*</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("0")}
                  disabled={alreadyExistingKeys.includes("0")}
                >
                  <span>0</span>
                </Button>
              </div>
              <div className="dialpad-key-container d-flex align-items-center justify-content-center">
                <Button
                  className="btn-ghost-dark fs-4"
                  onClick={() => handleNumber("#")}
                  disabled={alreadyExistingKeys.includes("#")}
                >
                  <span>#</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDialpad;
