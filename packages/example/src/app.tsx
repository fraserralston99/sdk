import React from "react"
import { Box, Container } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { AboutPage } from "./pages/about/about-page"
import { ConnectPage } from "./pages/connect/connect-page"
import { NotFoundPage } from "./pages/404/404-page"
import { Header } from "./components/parts/Header/header"
import { Navigation } from "./components/parts/navigation"
import { SdkConnectionProvider } from "./components/connector/sdk-connection-provider"
import { EnvironmentSelectorProvider } from "./components/connector/environment-selector-provider"
import { DeployPage } from "./pages/deploy/deploy-page"
import { SellPage } from "./pages/sell/sell-page"
import { BuyPage } from "./pages/buy/buy-page"
import { MintPage } from "./pages/mint/mint-page"
import { BidPage } from "./pages/bid/bid-page"
import { AcceptBidPage } from "./pages/accept-bid/acceptbid-page"
import { ItemsPage } from "./pages/items/items-page"
import { BuyBatchPage } from "./pages/buy-batch/buy-page"

export function App() {
	return (
		<EnvironmentSelectorProvider>
			{(connector) => (
				<SdkConnectionProvider connector={connector}>
					<Box>
						<Header/>
						<Container maxWidth="xl" sx={{
							mt: 2,
							display: 'grid',
							gridTemplateColumns: 'minmax(250px, 20%)  1fr',
							gap: "20px"
						}}>
							<Box component="nav">
								<Navigation/>
							</Box>
							<Box component="main">
								<Routes>
									<Route path="/" element={<AboutPage/>}/>
									<Route path="about" element={<AboutPage/>}/>
									<Route path="connect" element={<ConnectPage/>}/>
									<Route path="deploy" element={<DeployPage/>}/>
									<Route path="mint" element={<MintPage/>}/>
									<Route path="sell" element={<SellPage/>}>
										<Route path=":itemId" element={<SellPage/>}/>
									</Route>
									<Route path="buy" element={<BuyPage/>}>
										<Route path=":orderId" element={<BuyPage/>}/>
									</Route>
									<Route path="bid" element={<BidPage/>}>
										<Route path=":itemId" element={<BidPage/>}/>
									</Route>
									<Route path="buy-batch" element={<BuyBatchPage/>}/>
									<Route path="accept-bid" element={<AcceptBidPage/>}>
										<Route path=":orderId" element={<AcceptBidPage/>}/>
									</Route>
									<Route path="items" element={<ItemsPage/>}/>
									<Route path="*" element={<NotFoundPage/>}/>
								</Routes>
							</Box>
						</Container>
					</Box>
				</SdkConnectionProvider>
			)}
		</EnvironmentSelectorProvider>
	);
}
