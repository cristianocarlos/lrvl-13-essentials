import YiiLang from '~/phpgen/yii-lang';

import {useRef} from 'react';

import AnotherComponent from '@/pages/AnotherComponent';

import type {PageProps} from '@/types/page';

export default (props: PageProps) => {
  console.log('Home props', props);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}>
      {YiiLang.misc('Banana')}
      <AnotherComponent />
    </div>
  );
};
