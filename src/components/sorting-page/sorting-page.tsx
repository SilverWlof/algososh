import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Column, ColumnProps } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

import { Direction } from "../../types/direction";
import { wait } from "../../utils/utils";
import { SMALL_DELAY } from "../../utils/constants";

export const select = "select";
export const bubble = "bubble";
interface IDefaultState {
    isDebugging?: boolean,
    sortingType?: string,
    defaultNumbersList?: number[],
    debugAlertDelimeter?:string
}
export const SortingPage: React.FC<IDefaultState> = ({ isDebugging = false, sortingType = select, defaultNumbersList=null, debugAlertDelimeter="," }) => {
    const [selectedOption, setSelectedOption] = React.useState(sortingType);
    // const [arrColumnList, setArrColumnList] = React.useState<Array<JSX.Element>>([]);
    const [unsortedColumnPropsList, setUnsortedColumnPropsList] = React.useState<Array<ColumnProps>>([]);
    const [sortingUp, setSortingUp] = React.useState(false);
    const [sortingDown, setSortingDown] = React.useState(false);


    useEffect(() => {
        generateNew(defaultNumbersList);
    }, [])

    function randomArr(arrLength: number) {
        const result: number[] = [];
        for (let i = 0; i < arrLength; i++) {
            result.push(Math.floor(Math.random() * 101));
        }
        return result;
    }

    async function sortBySelection(isIncreasingDirection: boolean) {
        const sortedProps = [...unsortedColumnPropsList];
        for (let i = 0; i < sortedProps.length; i++) {
            let exchangeIndex = i;
            if (!isDebugging) {
                sortedProps[i].state = ElementStates.Changing;
                drawColumns(sortedProps)
            }
            for (let j = i + 1; j < sortedProps.length; j++) {
                if (!isDebugging) {
                    sortedProps[j].state = ElementStates.Changing;
                    drawColumns(sortedProps)
                }
                if ((sortedProps[exchangeIndex].index > sortedProps[j].index) === isIncreasingDirection) {
                    exchangeIndex = j;
                }

                if (!isDebugging) {
                    await wait(SMALL_DELAY);
                    sortedProps[j].state = ElementStates.Default;
                    drawColumns(sortedProps)
                }
            }
            if (i !== exchangeIndex) {
                const temp = sortedProps[i];
                if (!isDebugging) {
                    temp.state = ElementStates.Default;
                }
                sortedProps[i] = sortedProps[exchangeIndex];
                if (!isDebugging) {
                    sortedProps[i].state = ElementStates.Modified;
                }
                sortedProps[exchangeIndex] = temp;
                if (!isDebugging) {
                    drawColumns(sortedProps)
                }
            }
            else {
                if (!isDebugging) {
                    sortedProps[i].state = ElementStates.Modified;
                    drawColumns(sortedProps)
                }
            }
        }

        if (isDebugging) {
            debugSortResultAlerting(sortedProps);
        }

        setUnsortedColumnPropsList(sortedProps)
    }
    async function sortByBubble(isIncreasingDirection: boolean) {
        const sortedProps = [...unsortedColumnPropsList];
        for (let i = sortedProps.length-1; i > 0; i--) {

            for (let j = 0; j < i; j++) {
                if (!isDebugging) {
                    sortedProps[j].state = ElementStates.Changing;
                    sortedProps[j + 1].state = ElementStates.Changing;
                    drawColumns(sortedProps);
                }
                if ((sortedProps[j].index > sortedProps[j + 1].index) === isIncreasingDirection) { 
                    let temp = sortedProps[j];
                    sortedProps[j] = sortedProps[j + 1];
                    sortedProps[j + 1] = temp;
                    drawColumns(sortedProps);
                }
                if (!isDebugging) {
                    await wait(SMALL_DELAY);
                    sortedProps[j].state = ElementStates.Default;
                    sortedProps[j + 1].state = ElementStates.Default;
                    drawColumns(sortedProps);
                }
            }
            if (!isDebugging) {
                sortedProps[i].state = ElementStates.Modified;
                drawColumns(sortedProps);
            }
        }
        if (!isDebugging) {
            sortedProps[0].state = ElementStates.Modified;
            drawColumns(sortedProps);
        }
        if (isDebugging) {
            debugSortResultAlerting(sortedProps);
        }
        setUnsortedColumnPropsList(sortedProps)
    }
    function handleOptionChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        setSelectedOption(changeEvent.target.value)
    }

    function drawColumns(arr: ColumnProps[]) {
        setUnsortedColumnPropsList([...arr])
    }

    const handleNewArrayClick = (event: MouseEvent<HTMLButtonElement>) => {
        generateNew();
    };
    function generateNew(data?: number[] | null | undefined) {
        const propResult: ColumnProps[] = [];
        const length = Math.floor(Math.random() * 15) + 3;
        let newArr = randomArr(length);
        if (data) {
            newArr = data;
        }

        for (let i = 0; i < newArr.length; i++) {
            let newColumnState: ColumnProps = {
                index: newArr[i]
            };
            propResult.push(newColumnState)
        }

        const colResult: Array<JSX.Element> = [];
        for (let i = 0; i < propResult.length; i++) {
            let newColumnState = <Column key={i} {...propResult[i]} />
            colResult.push(newColumnState)
        }

        //setArrColumnList(colResult)
        setUnsortedColumnPropsList(propResult)

    }
    const handleUpSortClick = async (event: MouseEvent<HTMLButtonElement>) => {
        ClearColumnsState();
        if (!isDebugging) {

            setSortingUp(true)
        }
        switch (selectedOption) {
            case select:
                await sortBySelection(true);
                break;
            case bubble:
                await sortByBubble(true);
                break;
            default:
                break;
        }
        if (!isDebugging) {
            setSortingUp(false)
        }
    };
    const handleDownSortClick = async (event: MouseEvent<HTMLButtonElement>) => {
        ClearColumnsState();
        if (!isDebugging) {
            setSortingDown(true)
        }
        switch (selectedOption) {
            case select:
                await sortBySelection(false);
                break;
            case bubble:
                await sortByBubble(false);
                break;
            default:
                break;
        }
        if (!isDebugging) {
            setSortingDown(false)
        }

    };
    function ClearColumnsState() {
        const sortedProps = [...unsortedColumnPropsList];
        for (let i = 0; i < sortedProps.length; i++) {
            sortedProps[i].state = ElementStates.Default;
        }
        drawColumns(sortedProps);
    }

    function debugSortResultAlerting(sortResult:Array<ColumnProps>) {

        let result = "";
        for (let i = 0; i < sortResult.length; i++) {
            if (i !== 0) {
                result += debugAlertDelimeter;
            }
            result += sortResult[i].index;
        }
        alert(result)
    }

  return (
    <SolutionLayout title="Сортировка массива">
          <form className={`${styles.pageContent}`} data-cy="sorting-page">
              <div className={`${styles.contentColumn}`}>
                  <div className={`${styles.inputRow}`}>
                      <div className={`${styles.controlsPair}`}>
                          <RadioInput label="Выбор" value={select} checked={selectedOption === select} onChange={handleOptionChange}></RadioInput>
                          <RadioInput label="Пузырёк" value={bubble} checked={selectedOption === bubble} onChange={handleOptionChange}></RadioInput>
                      </div>
                      <div className={`${styles.controlsPair}`}>
                          <Button text="По возрастанию"
                              onClick={handleUpSortClick}
                              sorting={Direction.Ascending}
                              disabled={sortingUp || sortingDown}
                              isLoader={sortingUp}
                              data-testid="fireUpAlgorithmButton"
                          ></Button>
                          <Button
                              text="По убыванию"
                              onClick={handleDownSortClick}
                              sorting={Direction.Descending}
                              disabled={sortingUp || sortingDown}
                              isLoader={sortingDown}
                              data-testid="fireDownAlgorithmButton"
                          ></Button>
                      </div>
                      <Button text="Новый массив" onClick={handleNewArrayClick} disabled={sortingUp || sortingDown}></Button>
                  </div>
                  <ul className={`${styles.columnsRow}`}>
                      {unsortedColumnPropsList.map((columnProps,ind) => (
                          <li key={ind}>
                              <Column {...columnProps} />
                          </li>
                      ))}
                  </ul>
              </div>
          </form>
    </SolutionLayout>
  );
};
