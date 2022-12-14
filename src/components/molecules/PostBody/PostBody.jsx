import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { OgCard, TextBtn, Paragraph, Span, ParagraphForward } from '@@/components';
import * as S from './style';

export function PostBody({ postBody }) {
  const [content, setContent] = useState('');
  const [og, setOg] = useState(null);

  useEffect(() => {
    if (postBody) {
      const { content: rawContent, og: rawOg } = JSON.parse(postBody);
      setContent(rawContent);
      setOg(rawOg);
    }
  }, [postBody]);

  const [isContentTruncated, setIsContentTruncated] = useState(false);

  const onViewMoreBtnClick = () => {
    setIsContentTruncated(false);
  };

  return (
    <S.Body>
      <S.Content>
        <Paragraph>{content}</Paragraph>
        {isContentTruncated && (
          <TextBtn type="button" onClick={onViewMoreBtnClick}>
            <Span color="textSecond">더보기</Span>
          </TextBtn>
        )}
      </S.Content>
      {og && <OgCard og={og} />}
    </S.Body>
  );
}

PostBody.propTypes = {
  postBody: PropTypes.string.isRequired,
};
