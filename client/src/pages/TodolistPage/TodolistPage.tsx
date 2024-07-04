// npm install react-router-dom 설치

import React, { FC, useState } from "react";
import {
  appContainer,
  contentsContainer,
  completedList,
  uncompletedList,
  leftPanel,
  rightPanel,
  todoList,
  formTitle,
  // viewAllButton,
} from "./TodolistPage.css";
import Todo from "./TodolistPageComponents/Todo";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";

const TodoListPage = () => {
  const tmpTodoDatas = [
    {
      isChecked: false,
      description: "프로젝트프로젝트프로젝트프로젝트프로젝트",
      dueDate: "2024-05-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: true,
      description: "프로젝트2",
      dueDate: "2024-08-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트3",
      dueDate: "2024-07-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트4",
      dueDate: "2024-04-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트5",
      dueDate: "2024-03-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: false,
      description: "프로젝트6",
      dueDate: "2024-07-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: false,
      description: "프로젝트7",
      dueDate: "2024-07-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: false,
      description: "프로젝트1",
      dueDate: "2024-05-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: true,
      description: "프로젝트2",
      dueDate: "2024-03-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트3",
      dueDate: "2024-12-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트4",
      dueDate: "2024-07-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트5",
      dueDate: "2024-08-10",
      updatedAt: "05-10",
    },
    {
      isChecked: false,
      description: "프로젝트6",
      dueDate: "2024-07-10",
      updatedAt: "05-10",
    },
    {
      isChecked: false,
      description: "프로젝트7",
      dueDate: "2024-09-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: false,
      description: "프로젝트1",
      dueDate: "2024-05-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: true,
      description: "프로젝트2",
      dueDate: "2024-06-28",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트3",
      dueDate: "2024-07-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트4",
      dueDate: "2024-04-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트5",
      dueDate: "2024-03-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: false,
      description: "프로젝트6",
      dueDate: "2024-07-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: false,
      description: "프로젝트7",
      dueDate: "2024-07-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: false,
      description: "프로젝트1",
      dueDate: "2024-05-10",
      updatedAt: "2024-05-10",
    },
    {
      isChecked: true,
      description: "프로젝트2",
      dueDate: "2024-06-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트3",
      dueDate: "2024-12-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트4",
      dueDate: "2024-07-10",
      updatedAt: undefined,
    },
    {
      isChecked: false,
      description: "프로젝트5",
      dueDate: "2024-08-10",
      updatedAt: "05-10",
    },
    {
      isChecked: false,
      description: "프로젝트6",
      dueDate: "2024-07-10",
      updatedAt: "05-10",
    },
    {
      isChecked: false,
      description: "프로젝트7",
      dueDate: "2024-09-10",
      updatedAt: "2024-05-10",
    },
  ];

  // 음수 : 미래, 양수 : 과거
  const calcDiffDays = (date) => {
    const currentDate = new Date();
    const diffDays = Math.floor(
      (currentDate.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );

    return diffDays;
  };

  return (
    <div className={appContainer}>
      <Header />
      <div className={contentsContainer}>
        <div className={leftPanel}>
          <div className={uncompletedList}>
            <div className={formTitle}>기간 내 완료하지 못한 일들 </div>
            {tmpTodoDatas.map((elem, index) =>
              !elem.isChecked && calcDiffDays(elem.dueDate) > 0 ? (
                <div key={index}>
                  <Todo
                    isChecked={elem.isChecked}
                    description={elem.description}
                    dueDate={elem.dueDate}
                  />
                </div>
              ) : null
            )}
            {/* <div className={viewAllButton}>전체 보기</div> */}
          </div>

          <div className={completedList}>
            <div className={formTitle}>완료한 일들</div>
            {tmpTodoDatas.map((elem, index) =>
              elem.isChecked ? (
                <div key={index}>
                  <Todo
                    isChecked={elem.isChecked}
                    description={elem.description}
                    dueDate={elem.dueDate}
                  />
                </div>
              ) : null
            )}
            {/* <div className={viewAllButton}>전체 보기</div> */}
          </div>
        </div>

        <div className={rightPanel}>
          <div className={todoList}>
            <div className={formTitle}>해야할 일들</div>
            {tmpTodoDatas.map((elem, index) =>
              !elem.isChecked && calcDiffDays(elem.dueDate) < 0 ? (
                <div key={index}>
                  <Todo
                    isChecked={elem.isChecked}
                    description={elem.description}
                    dueDate={elem.dueDate}
                  />
                </div>
              ) : null
            )}
            {/* <div className={viewAllButton}>전체 보기</div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TodoListPage;
