import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme as UT } from '@react-navigation/native';
import React, { memo, useMemo, useState } from 'react';

import ToggleButton from './ToggleButton';
import AccordionPanel from './AccordionPanel';
import type { IAccordionProps } from './models';
import { Typography } from '../Typography';
import { useTheme } from '../../hooks';

const Accordion: React.FC<IAccordionProps> = ({
  children,
  title,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const { colors } = UT();

  const toggle = () => {
    setOpen((o) => !o);
  };

  const { shape } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        },
        container: {
          borderRadius: shape.borderRadius,
        },
      }),
    [shape]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.border }]}>
      <TouchableOpacity onPress={toggle}>
        <View style={styles.header}>
          <Typography>{title}</Typography>
          <ToggleButton value={open} />
        </View>
      </TouchableOpacity>

      <AccordionPanel open={open}>{children}</AccordionPanel>
    </View>
  );
};

export default memo(Accordion);
