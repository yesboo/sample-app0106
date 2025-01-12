/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function Person(props) {
  const { person, overrides, ...rest } = props;
  return (
    <View
      width="671px"
      height="192px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Person")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="19.363636016845703px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="316px"
        height="29px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="36px"
        left="36px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={person?.name}
        {...getOverrideProps(overrides, "name")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="19.363636016845703px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="328px"
        height="34px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="85px"
        left="35px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={person?.email}
        {...getOverrideProps(overrides, "email")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="19.363636016845703px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="140px"
        height="29px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="36px"
        left="430px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="age"
        {...getOverrideProps(overrides, "age")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="19.363636016845703px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="188px"
        height="26px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="84px"
        left="430px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="tel"
        {...getOverrideProps(overrides, "tel")}
      ></Text>
    </View>
  );
}
