import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";

import { Stack } from "../../utils/linearCollection";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";
import { ADD_BUTTON, REMOVE_BUTTON, SMALL_DELAY } from "../../utils/constants";

export const StackPage: React.FC = () => {
    const [inputStr, setInputStr] = React.useState<string>("");
    const [stringCirclesPropsList, setPropsList] = React.useState<Array<CircleProps>>([]);
    const [stringStack, setStringStack] = React.useState<Stack<string>>(new Stack<string>());
    const [isProcessing, setIsProcessing] = React.useState(false);
    ///
    const [processingMode, setProcessingMode] = React.useState("");
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputStr(e.target.value);
    };
    const handlePushClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setProcessingMode(ADD_BUTTON)
        setIsProcessing(true);
        stringStack.push(inputStr);
        drawCircles(true);
        await wait(SMALL_DELAY);
        drawCircles(false);
        setIsProcessing(false);
    };
    const handlePopClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setProcessingMode(REMOVE_BUTTON)
        setIsProcessing(true);
        drawCircles(true);
        stringStack.pop();
        await wait(SMALL_DELAY);
        drawCircles(false);
        setIsProcessing(false);
    };
    const handleClearClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsProcessing(false);
        setStringStack(new Stack<string>());
        setPropsList([]);
        setInputStr("")
        setIsProcessing(false);
    };

    function drawCircles(isLastColored: boolean) {
        const values = stringStack.getVisualisationData();
        if (values.length === 0) {
            setPropsList([]);
            setInputStr("")
        }
        else {
            const result: Array<CircleProps> = [];
            for (let i = 0; i < values.length; i++) {
                result.push({
                    letter: values[i],
                    index: i
                });
            }
            if (isLastColored) {
                result[values.length - 1].state = ElementStates.Changing;
            }
            result[values.length - 1].head = "top";
            setPropsList([...result]);
        }
        setInputStr("")
    }


  return (
      <SolutionLayout title="Стек">
          <div className={`${styles.pageContent}`} data-cy="stack-page">
              <div className={`${styles.contentColumn}`}>
                  <div className={`${styles.inputRow}`}>
                      <div className={`${styles.controlsGroup}`}>
                          <Input maxLength={4} isLimitText={true} value={inputStr} onChange={onValueChange} data-cy="main-input"></Input>
                          <Button text="Добавить" data-cy="add-button"
                              onClick={handlePushClick}
                              disabled={isProcessing || inputStr.length === 0}
                              isLoader={(processingMode === ADD_BUTTON) && isProcessing}></Button>
                          <Button text="Удалить" data-cy="remove-button"
                              onClick={handlePopClick}
                              disabled={isProcessing || stringStack.getSize() === 0}
                              isLoader={(processingMode === REMOVE_BUTTON) && isProcessing}></Button>
                      </div>
                      <Button text="Очистить" data-cy="clear-button"
                          onClick={handleClearClick}
                          disabled={isProcessing || stringStack.getSize() === 0}></Button>
                  </div>
                  <ul className={`${styles.circlesGrid}`} data-cy="visualization-grid">
                      {stringCirclesPropsList.map((circlesProps, ind) => (
                          <li key={ind} data-cy="visualization-element" >
                              <Circle {...circlesProps} />
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
    </SolutionLayout>
  );
};
