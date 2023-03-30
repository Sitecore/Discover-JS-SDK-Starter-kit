import { usePageWidgets, Widget, withPageWidgets } from '@sitecore-discover/react';
import Loader from '../../components/Loader';
import useUri from '../../hooks/useUri';
/**
 * @description Sitecore SDK provides 2 ways to render all the widgets included in a hosted page configured on CEC panel:
 *  - Using a hook called `usePageWidgets` or
 *  - Using a component called <PageWidgets />
 * The difference between both is that using a hook, developers can custom the way of how the widgets will be rendered, adding wrappers, class names, etc.
 * In both cases, to can render merchandising widgets like SearchResults, PreviewSearch or Recommendation developer must configure and initialize the widget using the function setWidget or setWidgetType as it is done in `sitecoreWidgetsConfig.js` file.
 *
 * For this demo site, we have decided to use the hook as it is in this component.
 * In order to use this hook it is needed to include it in the context of a "page". To do that the component has been wrapped with the higher order component called `withPageWidgets` provided for the SDK
 * @return renders all the widgets included in a hosted page configured on CEC panel for the current url in a custom way.
 */

const CustomPageWidgets = (props) => {
  const uri = useUri();
  const { isLoading, data: widgets = [] } = usePageWidgets(uri);
  return (
    <div {...props}>
      {isLoading && <Loader enabled={isLoading} />}
      {!isLoading &&
        widgets.map((w) =>
          w !== 'home_banner_main' ? (
            <Widget rfkId={w} key={w} className="container mt-5" />
          ) : (
            <Widget rfkId={w} key={w} />
          ),
        )}
    </div>
  );
};

export default withPageWidgets(CustomPageWidgets);
