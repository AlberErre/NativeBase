/* @flow */
'use strict';

import React from 'react';
import { ActivityIndicatorIOS, Platform } from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import NativeBaseComponent from '../Base/NativeBaseComponent';
import computeProps from '../../Utils/computeProps';


export default class SpinnerNB extends NativeBaseComponent {

    prepareRootProps() {

        var type = { 
            height: 80
        }

        var defaultProps = {
            style: type
        }     

        return computeProps(this.props, defaultProps);

    }
    
   
    render() {
        return(
            <ActivityIndicatorIOS {...this.prepareRootProps()}  color={this.props.color ? this.props.color : this.props.inverse ? 
                                                                this.getTheme().inverseSpinnerColor :
                                                                this.getTheme().defaultSpinnerColor}
                                                                size={this.props.size ? this.props.size : "large" } />
        );
    }    

}

