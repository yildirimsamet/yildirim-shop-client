import React, { useContext } from "react";
import BasketContext from "../../contexts/BasketContext";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "./index.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Sepetteki ürünlerim", "Create an ad group", "Create an ad"];
}

function getStepContent(step) {
  const { basket, setBasket } = useContext(BasketContext);
  let totalPrice = 0;
  basket.map((product) => {
    totalPrice += parseInt(product.count) * parseInt(product.price);
  });
  console.log(basket);
  switch (step) {
    case 0:
      return (
        <div className={styles.products}>
          <div className={styles.productsLeft}>
            {basket.map((product, index) => (
              <div className={styles.singleProduct} key={index}>
                <img
                  className={styles.singleProductImg}
                  src={product.image}
                  alt={product.productName}
                />
                <div className={styles.singleProductDesc}>
                  <p>
                    <strong>{product.productName}</strong>
                  </p>
                  <p>{product.price}</p>
                  <p>{product.count} Adet</p>
                  <div>
                    <button
                      disabled={product.count < 2 ? true : false}
                      onClick={() => {
                        setBasket(
                          basket.map((item) => {
                            if (item.itemId === product.itemId) {
                              return { ...item, count: item.count - 1 };
                            } else {
                              return item;
                            }
                          })
                        );
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => {
                        setBasket(
                          basket.map((item) => {
                            if (item.itemId === product.itemId) {
                              return { ...item, count: item.count + 1 };
                            } else {
                              return item;
                            }
                          })
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.productsRight}>
            <h3>Toplam fiyat:</h3>
            <p>{totalPrice} TL</p>
          </div>
        </div>
      );
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <div className={classes.instructions}>
              All steps completed - you&apos;re finished
            </div>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Geri
              </Button>
              {/* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )} */}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Siparişi oluştur" : "İleri"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default HorizontalLinearStepper;
