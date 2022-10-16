import React, { ReactNode, useState } from 'react';

import { Colors } from 'values';
import { Styles } from 'types';
import { Text } from 'common-components';
import config from 'config';

interface FAQProps {
  question: string;
  answer: ReactNode;
}

const FAQItem = (props: FAQProps) => {
  const { question, answer } = props;
  const [isOpen, setIsOpen] = useState(false);

  const styles: Styles = {
    container: {
      marginBottom: '20px',
      padding: '20px',
      background: Colors.IMAGE_BACKGROUND,
      display: 'flex',
      flexDirection: 'column',
      transition: '0.3s ease-in',
      cursor: 'pointer'
    }
  };

  return (
    <div onClick={() => setIsOpen(!isOpen)} style={styles.container}>
      <Text bold>{question}</Text>
      <Text style={styles.answer}>{isOpen && answer}</Text>
    </div>
  );
};

const FAQ = () => {
  const { FAQ } = config;
  const FAQGeneral = FAQ.filter(item => item.category === 'general');

  return (
    <>
      <Text style={{ marginBottom: '20px' }} size="large" bold>
        FAQ
      </Text>
      <Text style={{ marginBottom: '20px' }} size="medium" bold>
        General
      </Text>
      {FAQGeneral.map(item => (
        <FAQItem key={item.question} question={item.question} answer={item.answer} />
      ))}
    </>
  );
};

export default FAQ;
