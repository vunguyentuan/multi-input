import React, { Component } from 'react'

class Input extends Component {
  handleChange = event => {
    const value = event.target.value
    const { maxLength, onFull, onEmpty, onChange } = this.props

    onChange(value)
    if (value.length === maxLength) {
      return onFull()
    }

    if (value.length === 0) {
      return onEmpty()
    }
  }

  render() {
    return (
      <input
        ref={node => this._input = node}
        {...this.props}
        onChange={this.handleChange}
      />
    )
  }
}

Input.defaultProps = {
  type: 'text'
}

class MultiInput extends Component {
  constructor(props) {
    super(props);

    this._inputs = []
    
    this.state = {
      currentIndex: 0,
      values: [...Array(props.quantity)]
    }
  }

  handleFull = () => {
    const nextIndex = Math.min(this.state.currentIndex + 1, this.props.quantity - 1);
    this._inputs[nextIndex]._input.focus();
    this.setState({
      currentIndex: nextIndex
    })
  }

  handleEmpty = () => {
    const nextIndex = Math.max(this.state.currentIndex - 1, 0);
    this._inputs[nextIndex]._input.focus();
    this.setState({
      currentIndex: nextIndex
    })
  }

  handleChange = (value) => {
    this.setState({
      values: {
        ...this.state.values,
        [this.state.currentIndex]: value
      }
    }, () => {
      console.log(this.state.values)
      // console.log(this.state.values.join(""))
    })
  }

  handleFocus = (currentIndex) => {
    this.setState({
      currentIndex
    })
  }

  render() {
    const { maxLength, quantity } = this.props

    return (
      <div>
        {[...Array(quantity)].map((_, index) => (
          <Input
            maxLength={maxLength}
            ref={node => { this._inputs[index] = node}} 
            onFull={this.handleFull}
            onEmpty={this.handleEmpty}
            onChange={this.handleChange}
            onFocus={() => this.handleFocus(index)}
          />
        ))}
      </div>
    )
  }
}

export default MultiInput
