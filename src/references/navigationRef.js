import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

const setNavigator = nav => {
  navigator = nav;
};

const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
};

const pop = n => {
  navigator.dispatch(StackActions.pop({ n }));
};

const popToTop = () => {
  navigator.dispatch(StackActions.popToTop());
};

const reset = (first, second) => {
  const resetAction = StackActions.reset({
    index: 1,
    actions: [NavigationActions.navigate({ routeName: first }), NavigationActions.navigate({ routeName: second })],
  });
  navigator.dispatch(resetAction);
};

export { setNavigator, navigate, pop, popToTop, reset };
