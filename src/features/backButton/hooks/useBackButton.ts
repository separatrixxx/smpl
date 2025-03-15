import { useSetup } from "@/shared/hooks/useSetup";
import { useEffect } from "react";


export const useBackButton = (redirectPath: string) => {
  const { router, webApp } = useSetup();

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show();

      const handleBackButtonClick = () => {
        router.push(redirectPath);
      };

      webApp.BackButton.onClick(handleBackButtonClick);

      return () => {
        webApp.BackButton.offClick(handleBackButtonClick);
        webApp.BackButton.hide();
      };
    }
  }, [webApp, router, redirectPath]);
};
