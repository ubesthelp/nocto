import { useLoaderData, useParams } from "react-router-dom"

import { TwoColumnPageSkeleton } from "../../../components/common/skeleton"
import { TwoColumnPage } from "../../../components/layout/pages"
import { useProduct } from "../../../hooks/api/products"
import { ProductAttributeSection } from "./components/product-attribute-section"
import { ProductGeneralSection } from "./components/product-general-section"
import { ProductMediaSection } from "./components/product-media-section"
import { ProductOptionSection } from "./components/product-option-section"
import { ProductOrganizationSection } from "./components/product-organization-section"
import { ProductSalesChannelSection } from "./components/product-sales-channel-section"
import { ProductVariantSection } from "./components/product-variant-section"
import { PRODUCT_DETAIL_FIELDS } from "./constants"
import { productLoader } from "./loader"
import { NoctoSlot } from "@rsc-labs/nocto-plugin-system"

import { useExtension } from "../../../providers/extension-provider"
import { ProductShippingProfileSection } from "./components/product-shipping-profile-section"

export const ProductDetail = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof productLoader>
  >

  const { id } = useParams()
  const { product, isLoading, isError, error } = useProduct(
    id!,
    { fields: PRODUCT_DETAIL_FIELDS },
    {
      initialData: initialData,
    }
  )

  const { getWidgets } = useExtension()

  const after = getWidgets("product.details.after")
  const before = getWidgets("product.details.before")
  const sideAfter = getWidgets("product.details.side.after")
  const sideBefore = getWidgets("product.details.side.before")

  if (isLoading || !product) {
    return (
      <TwoColumnPageSkeleton
        mainSections={4}
        sidebarSections={3}
        showJSON
        showMetadata
      />
    )
  }

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after,
        before,
        sideAfter,
        sideBefore,
      }}
      showJSON
      showMetadata
      data={product}
    >
      <TwoColumnPage.Main>
        <NoctoSlot pluginId="@product-detail" name="general" runtimeProps={{ product }} fallback={<ProductGeneralSection product={product} />}/>
        <NoctoSlot pluginId="@product-detail" name="media" runtimeProps={{ product }} fallback={<ProductMediaSection product={product} />}/>
        <NoctoSlot pluginId="@product-detail" name="option" runtimeProps={{ product }} fallback={<ProductOptionSection product={product} />}/>
        <NoctoSlot pluginId="@product-detail" name="variant" runtimeProps={{ product }} fallback={<ProductVariantSection product={product} />}/>
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <NoctoSlot pluginId="@product-detail" name="salesChannel" runtimeProps={{ product }} fallback={<ProductSalesChannelSection product={product} />}/>
        <NoctoSlot pluginId="@product-detail" name="shippingProfile" runtimeProps={{ product }} fallback={<ProductShippingProfileSection product={product} />}/>
        <NoctoSlot pluginId="@product-detail" name="organization" runtimeProps={{ product }} fallback={<ProductOrganizationSection product={product} />}/>
        <NoctoSlot pluginId="@product-detail" name="attribute" runtimeProps={{ product }} fallback={<ProductAttributeSection product={product} />}/>
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}
