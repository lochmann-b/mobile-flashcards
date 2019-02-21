import React, { Component } from 'react';
import { Animated, TouchableOpacity } from 'react-native'
import styles from '../styles'
import PropTypes from 'prop-types'

class AnimatedCard extends Component {
    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.rotation = 0;
        this.animatedValue.addListener(({ value }) => {
            this.rotation = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    flipCard() {
        if (this.rotation >= 90) {
            this.toFaceDown()
        } else {
            this.toFaceUp()
        }
    }

    toFaceUp() {
        Animated.spring(this.animatedValue, {
            toValue: 180,
            friction: 8,
            tension: 4
        }).start();
    }

    toFaceDown() {
        Animated.spring(this.animatedValue, {
            toValue: 0,
            friction: 8,
            tension: 4
        }).start();
    }

    resetAnimation = () => {
        this.animatedValue.stopAnimation()
        if (this.rotation !== 0) {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 200
            }).start()
        }
    }


    render() {
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        return (
            <TouchableOpacity onPress={() => {
                this.flipCard()
            }}>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle, { opacity: this.frontOpacity }]}>
                    {this.props.children[0]}
                </Animated.View>
                <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, { opacity: this.backOpacity }]}>
                    {this.props.children[1]}
                </Animated.View>
            </TouchableOpacity>
        )

    }
}

AnimatedCard.propTypes = {
    children: PropTypes.array.isRequired
}

export default AnimatedCard;