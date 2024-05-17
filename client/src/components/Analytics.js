import React from "react";
import { Flex, Progress } from "antd";

import { green, red } from "@ant-design/colors";

const Analytics = ({ transactionData }) => {
  // Transaction calculation

  const totalTransaction = transactionData.length;
  const totalIncomeTransaction = transactionData.filter(
    (data) => data.type === "income"
  );
  const totalExpenseTransaction = transactionData.filter(
    (data) => data.type === "expense"
  );

  const incomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;

  const expensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // Transaction turnover

  const totalTurnover = transactionData.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnOver = transactionData
    .filter((data) => data.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpanseTurnOver = transactionData
    .filter((data) => data.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const incomePercentTurnOver = (totalIncomeTurnOver / totalTurnover) * 100;
  const expensePercentTurnOver = (totalExpanseTurnOver / totalTurnover) * 100;

  const categories = [
    "tip",
    "salary",
    "project",
    "travels",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  return (
    <>
      <div className="analytics-div">
        <div className="row m-10 ">
          <div className="col-md-3">
            <div className="card  card-css">
              <div className="card-header fw-bold">
                Total Transaction :{totalTransaction}
              </div>

              <div className="card-body">
                <h5 className="text-success">
                  Income : {totalIncomeTransaction.length}
                </h5>

                <h5 className="text-danger">
                  Expanse : {totalExpenseTransaction.length}
                </h5>
              </div>

              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={incomePercent.toFixed(0)}
              />
              <br />
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={expensePercent.toFixed(0)}
              />
              <br />
            </div>
          </div>

          <div className="col-md-3">
            <div className="card  card-css ">
              <div className="card-header fw-bold">Total TurnOver :{totalTurnover}</div>

              <div className="card-body">
                <h5 className="text-success">Income : {totalIncomeTurnOver}</h5>

                <h5 className="text-danger">
                  Expanse : {totalExpanseTurnOver}
                </h5>
              </div>

              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2 "
                percent={incomePercentTurnOver.toFixed(0)}
              />
              <br />

              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={expensePercentTurnOver.toFixed(0)}
              />
              <br />
            </div>
          </div>

          <div className="col-md-3">
            <div className="heading1">
              <h4>Categorywise Income</h4>
            </div>

            {categories.map((category) => {
              const amount = transactionData
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              return (
                amount > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress
                        strokeColor={"green"}
                        percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                          0
                        )}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>

          <div className="col-md-3">
            <div className="heading2">
              <h4>Categorywise Expanse</h4>
            </div>

            {categories.map((category) => {
              const amount = transactionData
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              return (
                amount > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress
                        strokeColor={"red"}
                        percent={(
                          (amount / totalExpanseTurnOver) *
                          100
                        ).toFixed(0)}
                      />
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;