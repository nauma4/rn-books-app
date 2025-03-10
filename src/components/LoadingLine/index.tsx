import React, { ReactNode } from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import COLORS from '../../helpers/colors';

export interface LoadingLinePropTypes {
  progress: number;
  duration: number;
}

const LoadingLine: React.FC<LoadingLinePropTypes> = ({
  progress = 100,
  duration = 2000,
}): ReactNode => {
  const progressValue = useSharedValue(0);

  React.useEffect(() => {
    progressValue.value = withTiming(progress, { duration });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLine} />
      <Animated.View style={[styles.progressLine, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 274,
    height: 6,
    position: 'relative',
  },
  backgroundLine: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: COLORS.white,
    opacity: 0.2,
  },
  progressLine: {
    position: 'absolute',
    height: '100%',
    borderRadius: 6,
    backgroundColor: COLORS.white,
  },
});

export default LoadingLine;
