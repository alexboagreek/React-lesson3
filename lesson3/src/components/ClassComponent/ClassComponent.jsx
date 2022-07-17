import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Pезультат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      count: 0,
      repeat: style.hidden,
      btnDisabled: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((state) => ({
      count: this.state.count + 1,
    }));
    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загадонного числа`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загадонного числа`,
        };
      }

      return {
        result: `Вы нострадамус - угадали загаданое число  ${state.userNumber},
        потыток ${state.count}`,
        userNumber: '',
        repeat: style.btnRepeat,
        btnDisabled: true,
      };
    });
  };

  handleChange = (event) => {
    this.setState({
      userNumber: event.target.value,
    });
  };

  handleRepeat = (event) => {
    this.setState({
      result: 'Результат',
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      repeat: style.hidden,
      count: 0,
      btnDisabled: false,
    });
  };

  render() {
    return (
      <div className='render__box'>
        <div className={style.game}>
          <p className={style.result}>{this.state.result}</p>

          <form className={style.form} onSubmit={this.handleSubmit}>
            <label className={style.label} htmlFor='user_number'>
              Угадай число
            </label>

            <input
              className={style.input}
              type='number'
              id='user_number'
              onChange={this.handleChange}
              value={this.state.userNumber}
            />
            <button className={style.btn}>Угадать</button>
          </form>
        </div>

        <button className={this.state.repeat} onClick={this.handleRepeat}>
          Сыграть ещё
        </button>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
