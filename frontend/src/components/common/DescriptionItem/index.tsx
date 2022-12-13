import React from 'react';
import styles from './index.module.scss';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}
export const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className={styles.site_description_item_profile_wrapper}>
    <p className={styles.site_description_item_profile_p_label}>{title}:</p>
    {content}
  </div>
);
