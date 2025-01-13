/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Text, View } from "@aws-amplify/ui-react";
export default function Header(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="570px"
      height="178px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "Header")}
      {...rest}
    >
      <Text
        fontFamily="Inria Serif"
        fontSize="32px"
        fontWeight="400"
        color="rgba(217,217,217,1)"
        lineHeight="38.36800003051758px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="351px"
        height="54px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="36px"
        bottom="88px"
        left="42px"
        right="177px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Title"
        {...getOverrideProps(overrides, "Title")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="12px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="14.522727012634277px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="271px"
        height="39px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="107px"
        left="41px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="this is a sample component"
        {...getOverrideProps(overrides, "this is a sample component")}
      ></Text>
    </View>
  );
}
