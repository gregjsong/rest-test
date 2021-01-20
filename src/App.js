import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [dataArr, setDataArr] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const url = `https://resttest.bench.co/transactions/`;
  const url2 = `.json`;

  const getPage = (i) => {
    let total = 0;
    fetch(url + i + url2)
      .then(res => res.json())
      .then(data => {
        setDataArr(prevState =>
          [...prevState, ...data.transactions]
        );
        data.transactions.forEach((obj) => {
          total += parseFloat(obj.Amount);
        })
        setTotalAmount(prevState => prevState += total);
      })
  };

  const toDollar = (str) => {
    let num = parseFloat(str).toFixed(2)
    if (num >= 0) {
      return '$' + num.toString();
    } else {
      return '-$' + num.toString().slice(1);
    }
  };

  const toFormatDate = (date) => {
    let year = date.slice(0, 4)
    let month = date.slice(5, 7)
    let day = date.slice(8, 10)
    switch (month) {
      case '01':
        return 'Jan' + day + ', ' + year;
      case '02':
        return 'Feb ' + day + ', ' + year;
      case '03':
        return 'Mar ' + day + ', ' + year;
      case '04':
        return 'Apr ' + day + ', ' + year;
      case '05':
        return 'May ' + day + ', ' + year;
      case '06':
        return 'Jun ' + day + ', ' + year;
      case '07':
        return 'Jul ' + day + ', ' + year;
      case '08':
        return 'Aug ' + day + ', ' + year;
      case '09':
        return 'Sep ' + day + ', ' + year;
      case '10':
        return 'Oct ' + day + ', ' + year;
      case '11':
        return 'Nov ' + day + ', ' + year;

      case '12':
        return 'Dec ' + day + ', ' + year;
      default: {
        return date
      }
    }
  }

  const dataTable = () => {
    const tableContent = dataArr.map(obj => {
      return (
        <tr key={dataArr.indexOf(obj)}>
          <td>{toFormatDate(obj.Date)}</td>
          <td>{obj.Company}</td>
          <td className='account'>{obj.Ledger}</td>
          <td>{toDollar(obj.Amount)}</td>
        </tr>
      )
    });

    return (
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Company</td>
            <td>Account</td>
            <td>{'$' + totalAmount.toFixed(2)}</td>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  };

  useEffect(() => {
    Promise.all([
      getPage(1),
      getPage(2),
      getPage(3),
      getPage(4)
    ]);
  }, []);

  return (
    <div className='App'>
      <div className='rest-test' >
        <header>
          <p>Bench Test</p>
        </header>
        <div className='table'>
          {dataTable()}
        </div>
      </div>
    </div>
  );
}

export default App