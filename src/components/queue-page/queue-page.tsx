import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { Queue } from "../../utils/linearCollection";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";

import { wait } from "../../utils/utils";
import { ADD_BUTTON, REMOVE_BUTTON, SMALL_DELAY } from "../../utils/constants";

export const QueuePage: React.FC = () => {
    const queueMaxLength = 7;

    const [inputStr, setInputStr] = React.useState<string>("");
    const [stringQueue, setStringQueue] = React.useState<Queue<string>>(new Queue<string>(queueMaxLength));
    const [stringCirclesPropsList, setPropsList] = React.useState<Array<CircleProps>>([]);
    const [isProcessing, setIsProcessing] = React.useState(false);
    ///
    const [processingMode, setProcessingMode] = React.useState("");
    useEffect(() => {
        drawCircles(false);
    },[])

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputStr(e.target.value);
    };
    const handleEnqueueClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setProcessingMode(ADD_BUTTON)
        setIsProcessing(true);
        let tailIndex = stringQueue.getTail();
        if (tailIndex !== null) {
            tailIndex++;
        }
        else {
            tailIndex = 0;
        }

        drawCircles(true, tailIndex);
        stringQueue.enqueue(inputStr);
        await wait(SMALL_DELAY);
        drawCircles(false);
        setIsProcessing(false);
    };
    const handleDequeueClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setProcessingMode(REMOVE_BUTTON)
        setIsProcessing(true);
        let headIndex = stringQueue.getHead();
        if (headIndex===null) {
            headIndex = 0;
        }
        drawCircles(true, headIndex);
        stringQueue.dequeue();
        await wait(SMALL_DELAY);
        drawCircles(false);
        setIsProcessing(false);
    };
    const handleClearClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setStringQueue(new Queue<string>(queueMaxLength));
        setInputStr("")
        const result: Array<CircleProps> = [];
        for (let i = 0; i < queueMaxLength; i++) {
            result.push({
                index: i
            });
        }
        setPropsList(result);
    };

    function drawCircles(isColored: boolean, colorIndex:number = 0) {
        const values = stringQueue.getVisualisationData();
        const result: Array<CircleProps> = [];
        for (let i = 0; i < values.length; i++) {
            const letterValue = values[i] !== null ? values[i] : "" as string;
            result.push({
                letter: letterValue as string,
                index: i
            });
        }

        if (isColored) {
            result[colorIndex].state = ElementStates.Changing;
        }

        const headIndex = stringQueue.getHead();
        if (headIndex !== null) {
            result[headIndex].head = "head";
        }
        const tailIndex = stringQueue.getTail();
        if (tailIndex !== null) {
            result[tailIndex].tail = "tail";
        }

        setPropsList(result);
        setInputStr("")
    }


  return (
      <SolutionLayout title="Очередь">
          <div className={`${styles.pageContent}`} data-cy="queue-page">
              <div className={`${styles.contentColumn}`}>
                  <div className={`${styles.inputRow}`}>
                      <div className={`${styles.controlsGroup}`}>
                          <Input maxLength={4} isLimitText={true} value={inputStr} onChange={onValueChange} data-cy="main-input"></Input>
                          <Button text="Добавить" data-cy="add-button"
                              onClick={handleEnqueueClick}
                              disabled={isProcessing || (inputStr.length === 0) || (stringQueue.getTail() === queueMaxLength - 1)}
                              isLoader={(processingMode === ADD_BUTTON) && isProcessing}></Button>
                          <Button text="Удалить" data-cy="remove-button"
                              onClick={handleDequeueClick}
                              disabled={isProcessing || stringQueue.getHead() === null}
                              isLoader={(processingMode === REMOVE_BUTTON) && isProcessing}></Button>
                      </div>
                      <Button text="Очистить" onClick={handleClearClick} disabled={isProcessing || (stringQueue.getHead() === null)} data-cy="clear-button"></Button>
                  </div>
                  <ul className={`${styles.circlesGrid}`} data-cy="visualization-grid">
                      {stringCirclesPropsList.map((circlesProps,ind) => (
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
