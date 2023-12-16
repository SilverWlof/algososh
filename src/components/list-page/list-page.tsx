import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { Circle, CircleProps } from "../ui/circle/circle";
import { LinkedList } from "../../utils/linearCollection";
import { ElementStates } from "../../types/element-states";

import { wait } from "../../utils/utils";
import { ADD_HEAD, ADD_INDEX, ADD_TAIL, REMOVE_HEAD, REMOVE_INDEX, REMOVE_TAIL, SMALL_DELAY } from "../../utils/constants";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
    const [indStr, setIndStr] = React.useState<string>("");
    const [nodeStr, setNodeStr] = React.useState<string>("");
    const [linkedNodeList, setLinkedNodeList] = React.useState<LinkedList<CircleProps>>(new LinkedList());
    const [circlesPropsList, setPropsList] = React.useState<Array<CircleProps>>([]);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const [processingMode, setProcessingMode] = React.useState("");

    useEffect(() => {
        for (let i = 0; i < 5; i++) {

            linkedNodeList.addHead({
                letter: Math.floor(Math.random() * 9999).toString(),
                state: ElementStates.Default
            });
        }
        drawCircles();
    }, [])

    function drawCircles() {
        const result: CircleProps[] = [];
        let tempNode = linkedNodeList.getAt(0)
        let i = 0;
        while (tempNode) {
            const prop = tempNode.value;
            prop.index = i;
            result.push(prop);
            tempNode = tempNode.next;
            i++;
        }
        setPropsList(result);
    }
    
    const handleAddHeadClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsProcessing(true)
        setProcessingMode(ADD_HEAD)
        if (linkedNodeList.getSize()) {

            const smallCircleState: CircleProps = {
                letter: nodeStr,
                state: ElementStates.Changing,
                isSmall:true
            };
            const smallCircle = <Circle key={-1} {...smallCircleState} />
            let head = linkedNodeList.getAt(0)
            if (head) {
                head.value.head = smallCircle;
            }
            drawCircles();
            await wait(SMALL_DELAY);
            if (head) {
                head.value.head = null;
            }
            linkedNodeList.addHead({
                letter: nodeStr,
                state: ElementStates.Modified
            });
            drawCircles();
            await wait(SMALL_DELAY);
            head = linkedNodeList.getAt(0)
            if (head) {
                head.value.state = ElementStates.Default;
            }
            drawCircles();
        }
        else {
            const newCircleState: CircleProps = {
                letter: nodeStr,
                state: ElementStates.Modified
            };
            linkedNodeList.addHead(newCircleState);
            drawCircles();
            await wait(SMALL_DELAY);
            const head = linkedNodeList.getAt(0)
            if (head) {
                head.value.state = ElementStates.Default;
            }
            drawCircles();
        }
        setIsProcessing(false)
    };
    const handleAddTailClick = async (event: MouseEvent<HTMLButtonElement>) => {//TODO если будет время, не забыть мигалку зеленым в отдельный метод (4 раза), тело хвоста и конца в один метод

        setIsProcessing(true)
        setProcessingMode(ADD_TAIL)
        const size = linkedNodeList.getSize()
        if (size) {

            const smallCircleState: CircleProps = {
                letter: nodeStr,
                state: ElementStates.Changing,
                isSmall: true
            };
            const smallCircle = <Circle key={-1} {...smallCircleState} />
            let tail = linkedNodeList.getAt(size - 1);
            if (tail) {
                tail.value.head = smallCircle;
            }
            drawCircles();
            await wait(SMALL_DELAY);
            if (tail) {
                tail.value.head = null;
            }
            linkedNodeList.addTail({
                letter: nodeStr,
                state: ElementStates.Modified
            });
            drawCircles();
            await wait(SMALL_DELAY);
            tail = linkedNodeList.getAt(size)
            if (tail) {
                tail.value.state = ElementStates.Default;
            }
            drawCircles();
        }
        else {
            const newCircleState: CircleProps = {
                letter: nodeStr,
                state: ElementStates.Modified
            };
            linkedNodeList.addHead(newCircleState);
            drawCircles();
            await wait(SMALL_DELAY);
            const tail = linkedNodeList.getAt(0)
            if (tail) {
                tail.value.state = ElementStates.Default;
            }
            drawCircles();
        }
        setIsProcessing(false)
    };
    const handleRemoveHeadClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsProcessing(true)
        setProcessingMode(REMOVE_HEAD)
        const size = linkedNodeList.getSize()
        if (size) {
            const head = linkedNodeList.getAt(0);

            if (head) {
                const headValue = head.value.letter;
                head.value.letter = "";
                const smallCircleState: CircleProps = {
                    letter: headValue,
                    state: ElementStates.Changing,
                    isSmall: true
                };
                const smallCircle = <Circle key={-1} {...smallCircleState} />
                head.value.tail = smallCircle;

                drawCircles();
                await wait(SMALL_DELAY);
                linkedNodeList.removeHead();
                drawCircles();
            }
        }
        setIsProcessing(false)
    };
    const handleRemoveTailClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsProcessing(true)
        setProcessingMode(REMOVE_TAIL)
        const size = linkedNodeList.getSize()
        if (size) {
            const tail = linkedNodeList.getAt(size-1);

            if (tail) {
                const headValue = tail.value.letter;
                tail.value.letter = "";
                const smallCircleState: CircleProps = {
                    letter: headValue,
                    state: ElementStates.Changing,
                    isSmall: true
                };
                const smallCircle = <Circle key={-1} {...smallCircleState} />
                tail.value.tail = smallCircle;

                drawCircles();
                await wait(SMALL_DELAY);
                linkedNodeList.removeTail();
                drawCircles();
            }
        }
        setIsProcessing(false)
    };
    const handleInsertAtClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsProcessing(true)
        setProcessingMode(ADD_INDEX)
        const insertInd = Number(indStr);
        const smallCircleState: CircleProps = {
            letter: nodeStr,
            state: ElementStates.Changing,
            isSmall: true
        };
        const smallCircle = <Circle key={-1} {...smallCircleState} />
        const size = linkedNodeList.getSize();

        if (insertInd <= size) {
            for (let i = 0; i <= insertInd; i++) {
                const tempNode = linkedNodeList.getAt(i)
                if (tempNode) {
                    tempNode.value.head = smallCircle;
                    drawCircles();
                    await wait(SMALL_DELAY);
                    tempNode.value.state = ElementStates.Changing;
                    tempNode.value.head = i === 0 ? "head" : "";
                }
            }
            for (let i = 0; i <= insertInd; i++) {
                const tempNode = linkedNodeList.getAt(i)
                if (tempNode) {
                    tempNode.value.state = ElementStates.Default;
                }
            }
            const newCircleState: CircleProps = {
                letter: nodeStr,
                state: ElementStates.Modified
            };
            linkedNodeList.insertAt(newCircleState, insertInd);
            drawCircles();
            await wait(SMALL_DELAY);
            const tail = linkedNodeList.getAt(insertInd)
            if (tail) {
                tail.value.state = ElementStates.Default;
            }
            drawCircles();
        }
        setIsProcessing(false)
    };
    const handleRemoveAtClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setIsProcessing(true)
        setProcessingMode(REMOVE_INDEX)
        const removeInd = Number(indStr);
        const size = linkedNodeList.getSize();
        if (removeInd <= size) {
            for (let i = 0; i < removeInd; i++) {
                const tempNode = linkedNodeList.getAt(i)
                if (tempNode) {
                    tempNode.value.state = ElementStates.Changing;
                    drawCircles();
                    await wait(SMALL_DELAY);
                }
            }
            const tempNode = linkedNodeList.getAt(removeInd);
            if (tempNode) {

                for (let i = 0; i <= removeInd; i++) {
                    const tempNode = linkedNodeList.getAt(i)
                    if (tempNode) {
                        tempNode.value.state = ElementStates.Default;
                    }
                }
                const smallCircleState: CircleProps = {
                    letter: tempNode.value.letter,
                    state: ElementStates.Changing,
                    isSmall: true
                };
                const smallCircle = <Circle key={-1} {...smallCircleState} />
                tempNode.value.letter = "";
                tempNode.value.tail = smallCircle;
                drawCircles();
                await wait(SMALL_DELAY);
                linkedNodeList.removeAt(removeInd);
                drawCircles();
            }

        }
        setIsProcessing(false)
    };
    const onNodeStrValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNodeStr(e.target.value);
    };
    const onIndValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIndStr(e.target.value);
    };
  return (
      <SolutionLayout title="Связный список">
          <div className={`${styles.pageContent}`}>
              <div className={`${styles.contentColumn}`}>
                  <div>
                      <div className={`${styles.inputRow}`}>
                          <Input extraClass={`${styles.inputControl}`} maxLength={4} isLimitText={true} value={nodeStr} onChange={onNodeStrValueChange}></Input>
                          <Button extraClass={`${styles.Button}`} text="Добавить в head" onClick={handleAddHeadClick}
                              isLoader={(processingMode === ADD_HEAD) && isProcessing}
                              disabled={isProcessing || (nodeStr.length === 0)}></Button>
                          <Button extraClass={`${styles.Button}`} text="Добавить в tail" onClick={handleAddTailClick}
                              isLoader={(processingMode === ADD_TAIL) && isProcessing}
                              disabled={isProcessing || (nodeStr.length === 0)}></Button>
                          <Button extraClass={`${styles.Button}`} text="Удалить из head" onClick={handleRemoveHeadClick}
                              isLoader={(processingMode === REMOVE_HEAD) && isProcessing}
                              disabled={isProcessing || (linkedNodeList.getSize() === 0)}></Button>
                          <Button extraClass={`${styles.Button}`} text="Удалить из tail" onClick={handleRemoveTailClick}
                              isLoader={(processingMode === REMOVE_TAIL) && isProcessing}
                              disabled={isProcessing || (linkedNodeList.getSize() === 0)}></Button>
                      </div>
                      <div className={`${styles.inputRow}`}>
                          <Input type="number" extraClass={`${styles.inputControl}`} value={indStr} onChange={onIndValueChange}></Input>
                          <Button extraClass={`${styles.wideButton}`} text="Добавить по индексу" onClick={handleInsertAtClick}
                              isLoader={(processingMode === ADD_INDEX) && isProcessing}
                              disabled={isProcessing || (nodeStr.length === 0) || (indStr.length === 0) || (linkedNodeList.getSize() < Number(indStr))}></Button>
                          <Button extraClass={`${styles.wideButton}`} text="Удалить по индексу" onClick={handleRemoveAtClick}
                              isLoader={(processingMode === REMOVE_INDEX) && isProcessing}
                              disabled={isProcessing || (indStr.length === 0) || (linkedNodeList.getSize() < Number(indStr))} ></Button>
                      </div>
                  </div>
                  <ul className={`${styles.circlesGrid}`}>
                      {circlesPropsList.map((circlesProps,ind) => (
                          <li key={ind} className={`${styles.listNode}`}>
                              <Circle {...circlesProps} />
                              {circlesPropsList.length - 1 !== ind &&
                                  <div className={`${styles.arrowBlock}`}>
                                      <ArrowIcon />
                                  </div>}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
    </SolutionLayout>
  );
};
