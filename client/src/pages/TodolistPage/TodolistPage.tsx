// npm install react-router-dom 설치

import React, { FC } from "react";
import {
  appContainer,
  contentsContainer,
  completedList,
  uncompletedList,
  leftPanel,
  rightPanel,
  todoList,
  formTitle,
  viewAllButton,
} from "./TodolistPage.css";
import Todo from "./TodolistPageComponents/Todo";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";

const TodoListPage: FC = () => {
  const tmpDatas = [
    { checked: false, description: "프로젝트1", dueDate: "05-10" },
    { checked: true, description: "프로젝트2", dueDate: "06-10" },
    { checked: false, description: "프로젝트3", dueDate: "07-10" },
    { checked: false, description: "프로젝트3", dueDate: "07-10" },
    { checked: false, description: "프로젝트3", dueDate: "07-10" },
    { checked: false, description: "프로젝트3", dueDate: "07-10" },
    { checked: false, description: "프로젝트3", dueDate: "07-10" },
  ];

  return (
    <div className={appContainer}>
      <Header />
      <div className={contentsContainer}>
        <div className={leftPanel}>
          <div className={uncompletedList}>
            <div className={formTitle}>기간 내 완료하지 못한 일들 </div>
            {tmpDatas.map((elem, index) => {
              return (
                <div key={index}>
                  <Todo
                    checked={elem.checked}
                    description={elem.description}
                    dueDate={elem.dueDate}
                  />
                </div>
              );
            })}
            <div className={viewAllButton}>전체 보기</div>
          </div>

          <div className={completedList}>
            <div className={formTitle}>완료한 일들</div>
            {tmpDatas.map((elem, index) => {
              return (
                <div key={index}>
                  <Todo
                    checked={elem.checked}
                    description={elem.description}
                    dueDate={elem.dueDate}
                  />
                </div>
              );
            })}
            <div className={viewAllButton}>전체 보기</div>
          </div>
        </div>

        <div className={rightPanel}>
          <div className={todoList}>
            <div className={formTitle}>해야할 일들</div>
            {tmpDatas.map((elem, index) => {
              return (
                <div key={index}>
                  <Todo
                    checked={elem.checked}
                    description={elem.description}
                    dueDate={elem.dueDate}
                  />
                </div>
              );
            })}
            <div className={viewAllButton}>전체 보기</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TodoListPage;
