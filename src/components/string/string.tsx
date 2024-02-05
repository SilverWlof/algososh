import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle, CircleProps } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";
import { NORMAL_DELAY } from "../../utils/constants";

export const StringComponent: React.FC<{ isDebugging?: boolean, defaultString?: string }> = ({ isDebugging = false, defaultString =""}) => {
    const [inputStr, setInputStrValue] = React.useState<string>(defaultString);
    const [stringCirclesPropsList, setPropsList] = React.useState<Array<CircleProps>>([]);
    const [isDisabled, setEnableValue] = React.useState<boolean>(false);

    const handleTurnAroundClick = (event: MouseEvent<HTMLButtonElement>) => {
        const charArrayToReverse = inputStr.split('');
        const stringCircles: Array<CircleProps> = [];
        for (let i = 0; i < charArrayToReverse.length; i++) {
            const newCircleState: CircleProps = {
                letter: charArrayToReverse[i]
            };
            stringCircles.push(newCircleState)
        }
        reverseStep(stringCircles);
    };

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputStrValue( e.target.value );
    };

    async function reverseStep(stringCircles: Array<CircleProps>) {
        setEnableValue(true);
        let mid = Math.floor(stringCircles.length / 2);
        if (stringCircles.length === 2*mid) {
            mid -=1;
        }

        if (!isDebugging) {
            setPropsList([...stringCircles]);
            await wait(NORMAL_DELAY);
        }

        for (let index = 0; index <= mid; index++) {
            let reverseInd = stringCircles.length - 1 - index;
            if (!isDebugging) {
                if (reverseInd !== index) {
                    stringCircles[index].state = ElementStates.Changing;
                    stringCircles[reverseInd].state = ElementStates.Changing;
                    setPropsList([...stringCircles]);
                }
                await wait(NORMAL_DELAY);
                stringCircles[index].state = ElementStates.Modified;
                stringCircles[reverseInd].state = ElementStates.Modified;
            }
            const temp = stringCircles[index];
            stringCircles[index] = stringCircles[reverseInd];
            stringCircles[reverseInd] = temp;
            setPropsList([...stringCircles]);
        }
        setEnableValue(false);
        if (isDebugging) {
            let result = "";
            stringCircles.forEach((element) => { result += element.letter })
            alert(result)
        }
    }
    return (
        <SolutionLayout title="Строка">
            <div className={`${styles.pageContent}`} data-cy="recursion-page">
              <div className={`${styles.contentColumn}`}>
                  <div>
                      <div className={`${styles.inputRow}`}>
                            <Input maxLength={11} isLimitText={true} value={inputStr} data-cy="main-input"
                              onChange={onValueChange}></Input>
                            <Button text="Развернуть" data-testid="fireAlgorithmButton" data-cy="reverse-button"
                              onClick={handleTurnAroundClick}
                              disabled={isDisabled || inputStr===""} isLoader={isDisabled}></Button>
                      </div>
                  </div>
                    <ul className={`${styles.circlesGrid}`} data-cy="visualization-grid">
                      {stringCirclesPropsList.map((circlesProps, ind) => (
                          <li key={ind} data-cy="visualization-element" >
                              <Circle {...circlesProps}/>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
    </SolutionLayout>
  );
};