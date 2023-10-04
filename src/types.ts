export enum TodoStatus {
    Pending = "Pending",
    InProgress= "In Progress",
    Complete="Complete",
};

export interface Todo {
id: number;
title: string;
description: string;
status: TodoStatus;
}