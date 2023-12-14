import { Icon } from "@chakra-ui/react";

export const IconStar = (props) => (
    <Icon viewBox="0 0 21 20" {...props}>
      <path
        fill="transparent"
        d="M3.7513 18.3332V14.1665M3.7513 5.83317V1.6665M1.66797 3.74984H5.83464M1.66797 16.2498H5.83464M10.8346 2.49984L9.38949 6.25722C9.15448 6.86825 9.03697 7.17376 8.85424 7.43074C8.69229 7.6585 8.4933 7.8575 8.26554 8.01945C8.00856 8.20218 7.70305 8.31968 7.09202 8.55469L3.33464 9.99984L7.09202 11.445C7.70305 11.68 8.00856 11.7975 8.26554 11.9802C8.4933 12.1422 8.69229 12.3412 8.85424 12.5689C9.03697 12.8259 9.15448 13.1314 9.38949 13.7425L10.8346 17.4998L12.2798 13.7425C12.5148 13.1314 12.6323 12.8259 12.815 12.5689C12.977 12.3412 13.176 12.1422 13.4037 11.9802C13.6607 11.7975 13.9662 11.68 14.5773 11.445L18.3346 9.99984L14.5772 8.55469C13.9662 8.31968 13.6607 8.20217 13.4037 8.01945C13.176 7.8575 12.977 7.6585 12.815 7.43074C12.6323 7.17376 12.5148 6.86825 12.2798 6.25722L10.8346 2.49984Z"
        stroke={props.colorStroke ? props.colorStroke : "#475569"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </Icon>
  );