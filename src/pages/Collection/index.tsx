/* eslint-disable @typescript-eslint/no-explicit-any */
import { Attribute, NFTUrl, Styles } from 'types';
import { PageContainer, Text, ThumbnailSection } from 'common-components';
import React, { useEffect, useState } from 'react';
import { getAttributeStats, getNftStats, getNftUrlsFromAttributes } from 'apis';

import { Colors } from 'values';
import Select from 'react-select';
import _ from 'underscore';
import config from 'config';
import { getRarityColor } from 'helper';
import makeAnimated from 'react-select/animated';
import { useParams } from 'react-router-dom';

type AttributeOption = { value: string; label: string; category: string };
type OptionSections = { label: string; options: AttributeOption[] }[];
const Collection = () => {
  const { collectionSize, nameOfSingleNft } = config;
  const { page } = useParams<{ page: string }>();
  const [nftUrls, setNftUrls] = useState<NFTUrl[] | undefined>();
  const [currentOptions, setCurrentOptions] = useState<OptionSections>([]);
  const [selectedOptions, setSelectedOptions] = useState<AttributeOption[]>([]);

  useEffect(() => {
    getNftUrlsFromAttributes('thumbnail', []).then(setNftUrls);
    getAttributeStats().then(attributes => setCurrentOptions(parseOptions(attributes)));
  }, []);

  const customStyles = {
    option: (provided: any) => {
      const backgroundColor = Colors.WHITE;
      const fontColor = Colors.TEXT;
      return {
        ...provided,
        backgroundColor: backgroundColor,
        borderBottom: `1px solid ${Colors.GREY}`,
        color: fontColor,
        fontSize: '1em',
        padding: 2,
        paddingLeft: 10
      };
    },
    control: (style: any) => ({
      ...style,
      borderRadius: '0px',
      width: '100%',
      border: `2px solid ${Colors.PRIMARY}`,
      padding: 0,
      fontSize: '1em'
    }),
    group: () => ({}),
    groupHeading: () => ({}),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  };

  const formatGroupLabel = (data: any) => (
    <div style={{ ...styles.groupStyles, background: getRarityColor(data.label) }}>
      <Text size="medium" style={{ margin: '10px' }} color={Colors.WHITE}>
        {data.label}
      </Text>
      <Text size="default" style={styles.groupBadgeStyles}>
        {data.options.length}
      </Text>
    </div>
  );

  const styles: Styles = {
    multiselect: {
      width: '100%',
      border: `2px solid ${Colors.PRIMARY}`,
      padding: 0,
      fontSize: '1em'
    },
    chips: {
      background: Colors.PRIMARY,
      borderRadius: '0px',
      height: '30px',
      margin: 0,
      marginRight: '10px',
      fontSize: '1em'
    },
    groupHeading: {
      background: Colors.LEGENDARY
    },
    groupStyles: {
      display: 'flex',
      width: '100%',
      padding: 0,
      alignItems: 'center',
      justifyContent: 'start',
      height: '45px'
    },
    groupBadgeStyles: {
      marginLeft: '10px',
      backgroundColor: '#EBECF0',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '2em',
      display: 'flex',
      fontWeight: 'normal',
      lineHeight: '1',
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center'
    }
  };

  const getAllAttributesInNFTs = async (data: NFTUrl[]): Promise<Attribute[]> => {
    const vals = await await Promise.all(data.map(nftUrl => getNftStats(nftUrl.nftId)));
    const res: Attribute[] = [];
    vals.forEach(val => res.push(...val.attributes));
    return _.uniq(
      res.sort((a, b) => (a.name < b.name ? -1 : 1)),
      true,
      att => att.name
    );
  };

  const parseOptions = (options: Attribute[]): OptionSections => {
    const sortedOptions = options.sort().map(attribute => {
      const { name, category } = attribute;
      return { value: name, label: name, category };
    });
    const parsedSection = _.chain(sortedOptions)
      .groupBy('category')
      .map((value, key) => ({ label: key, options: value }))
      .value();
    parsedSection.sort(
      (a, b) =>
        ['BODY', 'SPECIAL', 'LEGENDARY', 'SUPER', 'RARE', 'GOOD', 'COMMON'].indexOf(a.label) -
        ['BODY', 'SPECIAL', 'LEGENDARY', 'SUPER', 'RARE', 'GOOD', 'COMMON'].indexOf(b.label)
    );
    return parsedSection;
  };

  const updateSelectedOptions = async (event: unknown) => {
    const attributeOptions = event as AttributeOption[];
    setNftUrls(undefined);
    if (attributeOptions.length === 0) {
      getNftUrlsFromAttributes('thumbnail', []).then(setNftUrls);
      getAttributeStats().then(attributes => setCurrentOptions(parseOptions(attributes)));
    } else {
      const nftUrl = await getNftUrlsFromAttributes(
        'thumbnail',
        attributeOptions.map(attr => attr.value)
      );
      const options = await getAllAttributesInNFTs(nftUrl);
      setNftUrls(nftUrl);
      setSelectedOptions(attributeOptions);
      setCurrentOptions(parseOptions(options));
    }
  };

  const animatedComponents = makeAnimated();

  return (
    <PageContainer>
      <div style={{ marginBottom: '100px', marginTop: '20px', color: Colors.TEXT }}>
        <Text size="large" bold>
          {collectionSize} {nameOfSingleNft}s
        </Text>
        <Select
          options={currentOptions}
          styles={customStyles}
          isMulti
          components={animatedComponents}
          onChange={updateSelectedOptions}
          formatGroupLabel={formatGroupLabel}
        />
        <div>
          <ThumbnailSection
            nftUrls={nftUrls}
            getNftUrls={() => getNftUrlsFromAttributes('thumbnail', [])}
            isPaginated
            defaultPage={page ? parseInt(page) : 0}
            isSearch={selectedOptions.length > 0}
            sectionNumberUseBounds
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Collection;
