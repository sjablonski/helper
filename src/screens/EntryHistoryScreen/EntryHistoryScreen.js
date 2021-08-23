import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Appbar, Badge, Button, Divider, List, Paragraph } from 'react-native-paper';
import Alert from 'components/Alert';
import Spacer from 'components/Spacer';
import Wrapper from 'components/Wrapper';
import useNavigationEvents from 'hooks/useNavigationEvents';
import formatDate from 'utils/formatDate';
import statusConversion from 'utils/statusConversion';

const EntryHistoryScreen = ({
  navigation,
  error,
  pending,
  lastId,
  entries,
  fetchEntries,
  fetchMoreEntries,
  listenReportList,
  refreshEntries,
  clearError,
}) => {
  useNavigationEvents('willBlur', () => {
    clearError();
  });

  const handleNavigation = () => {
    navigation.toggleDrawer();
  };

  const Item = item => {
    const status = statusConversion(item.status);

    return (
      <List.Item
        title={item.reportType}
        description={formatDate(item.createdOn)}
        right={() => <Badge style={[{ alignSelf: 'center', backgroundColor: status.color }]}>{status.name}</Badge>}
        onPress={() => navigation.navigate('EntryDetails', { id: item.reportId })}
      />
    );
  };

  useEffect(() => {
    if (entries.length) {
      fetchMoreEntries(lastId);
    } else {
      fetchEntries();
    }
    listenReportList();
  }, []);

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={handleNavigation} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Historia zgłoszeń" />
        <Appbar.Action />
      </Appbar.Header>

      <SafeAreaView style={{ flex: 1 }}>
        <Spacer>{error ? <Alert type="error" message={error} /> : null}</Spacer>
        {entries.length ? (
          <View style={{ flex: 1 }}>
            <FlatList
              keyExtractor={item => item.reportId}
              data={entries}
              extraData={entries}
              renderItem={({ item }) => Item(item)}
              ItemSeparatorComponent={() => <Divider />}
              refreshing={pending}
              onRefresh={() => refreshEntries(entries.length)}
            />
            {!pending && (
              <Button loading={pending} mode="outlined" onPress={() => fetchMoreEntries(lastId)}>
                Załaduj więcej
              </Button>
            )}
          </View>
        ) : (
          <>
            <Spacer>
              <Paragraph style={{ textAlign: 'center' }}>Brak danych</Paragraph>
            </Spacer>
            <Spacer>
              <Button loading={pending} mode="outlined" onPress={() => fetchEntries()}>
                Odświerz
              </Button>
            </Spacer>
          </>
        )}
      </SafeAreaView>
    </Wrapper>
  );
};

export default EntryHistoryScreen;
