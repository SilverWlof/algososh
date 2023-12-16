import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle, CircleProps } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";
import { NORMAL_DELAY } from "../../utils/constants";

export const StringComponent: React.FC = () => {
    const [inputStr, setInputStrValue] = React.useState<string>("");
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
        const mid = Math.floor(stringCircles.length / 2);

        for (let index = 0; index <= mid; index++) {
            let reverseInd = stringCircles.length - 1 - index;
            if (reverseInd !== index) {
                stringCircles[index].state = ElementStates.Changing;
                stringCircles[reverseInd].state = ElementStates.Changing;
                setPropsList([...stringCircles]);
            }
            await wait(NORMAL_DELAY);
            stringCircles[index].state = ElementStates.Modified;
            stringCircles[reverseInd].state = ElementStates.Modified;
            const temp = stringCircles[index];
            stringCircles[index] = stringCircles[reverseInd];
            stringCircles[reverseInd] = temp;
            setPropsList([...stringCircles]);
        }
        setEnableValue(false);
    }
  return (
      <SolutionLayout title="Строка">
          <div className={`${styles.pageContent}`}>
              <div className={`${styles.contentColumn}`}>
                  <div>
                      <div className={`${styles.inputRow}`}>
                          <Input maxLength={11} isLimitText={true} value={inputStr}
                              onChange={onValueChange}></Input>
                          <Button text="Развернуть"
                              onClick={handleTurnAroundClick}
                              disabled={isDisabled || inputStr===""} isLoader={isDisabled}></Button>
                      </div>
                  </div>
                  <ul className={`${styles.circlesGrid}`}>
                      {stringCirclesPropsList.map((circlesProps, ind) => (
                          <li key={ind}>
                              <Circle {...circlesProps} />
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
    </SolutionLayout>
  );
};