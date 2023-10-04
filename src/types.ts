export enum TodoStatus {
    Pending = "pending",
    InProgress= "inProgress",
    Complete="complete",
};

export interface Todo {
id: number;
title: string;
description: string;
status: TodoStatus;
}