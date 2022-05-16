import React, { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Box, CardMedia, MenuItem, Stack } from "@mui/material"
import { PrepareFillResponse } from "@rarible/sdk/build/types/order/fill/domain"
import { FormTextInput } from "../../components/common/form/form-text-input"
import { FormSubmit } from "../../components/common/form/form-submit"
import { resultToState, useRequestResult } from "../../components/hooks/use-request-result"
import { ConnectorContext } from "../../components/connector/sdk-connection-provider"
import { RequestResult } from "../../components/common/request-result"
import { FormSelect } from "../../components/common/form/form-select";
import * as Uniswap from "@uniswap/sdk";

import { ChainId, Token, Fetcher } from '@uniswap/sdk'
import { useParams } from "react-router-dom";
import { EthErc20AssetType } from "@rarible/api-client";

async function init() {
  const chainId = ChainId.RINKEBY
  const wethAddress = '0xc778417e063141139fce010982780140aa0cd5ab'

  await getAllAssets()
}
init()

interface IBuyFormProps {
	prepare: PrepareFillResponse
	disabled?: boolean
	onComplete: (response: any) => void
}

async function getAllAssets() {
  // const response = await fetch("https://api.coinmarketcap.com/data-api/v3/uniswap/all.json")
  // const json = await response.json()
  const assets = [
    {"name":"WETH","address":"ETHEREUM:0xc778417e063141139fce010982780140aa0cd5ab","decimals":18,"symbol":"WETH","logoURI":"https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png"},
    {"name":"DAI","address":"ETHEREUM:0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658","decimals":18,"symbol":"DAI","logoURI":"https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png"},
    // {"name":"USDC","address":"0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658","decimals":18,"symbol":"USDC","logoURI":"https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png"},
  ]
  console.log(assets)
  return assets
}

export type CurrencyType = any

export function BuyForm({ prepare, disabled, onComplete }: IBuyFormProps) {
	const connection = useContext(ConnectorContext)
	const form = useForm()
	const { handleSubmit } = form
	const { result, setError } = useRequestResult()
  const { orderId } = useParams()
  const [isLoadingOrder, setLoadingOrder] = useState(true)
  const [currencies, setCurrencies] = useState([] as CurrencyType[])
  const [activeCurrency, setActiveCurrency] = useState('')


  useEffect(() => {
    async function getOrder() {
      if (!orderId) {
        throw new Error("OrderId is undefined")
      }
      const order = await connection.sdk?.apis.order.getOrderById({ id: orderId })
      console.log('form', form, prepare, result, 'params', orderId, 'order', order)
      if (!order) {
        throw new Error("Order is not exists")
      }
      if (!currencies.length && order.take.type["@type"] === "ERC20") {
        const assets = await getAllAssets()
        const defaultCurrency = assets.find(asset => asset.address === (order.take.type as EthErc20AssetType).contract.split(":")[1])
        console.log('defaultCurrency', defaultCurrency, 'or take', order.take.type)
        if (!connection.walletAddress) {
          throw new Error("Wallet is undefined")
        }
        console.log('wal', connection.walletAddress)
        const assetsWithBalances = await Promise.all(
          assets.map(async asset => {
            console.log('asset', asset)
            const balance = await connection.sdk?.balances.getBalance(connection.walletAddress as any, (asset as any).address)
            return {
              ...asset,
              walletBalance: balance && balance.toString(),
            }
          })
        )
        console.log('assetsWithBalances', assetsWithBalances)
        setCurrencies(assetsWithBalances)
        if (defaultCurrency) {
          setActiveCurrency(defaultCurrency.symbol)
        }
      }
      setLoadingOrder(false)

    }
    getOrder()
  })

  const pairs = [
    {
      token0: "0xc778417e063141139fce010982780140aa0cd5ab",
      token1: "0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658"
    },
  ]

  return (
		<>
			<form onSubmit={handleSubmit(async (formData) => {
				if (!connection.sdk) {
					return
				}

				try {
					onComplete(await prepare.submit({
						amount: parseInt(formData.amount)
					}))
				} catch (e) {
					setError(e)
				}
			})}
			>
				<Stack spacing={2}>
					<FormTextInput
						type="number"
						inputProps={{ min: 1, max: prepare.maxAmount, step: 1 }}
						form={form}
						options={{
							min: 1,
							max: Number(prepare.maxAmount)
						}}
						name="amount"
						label="Amount"
					/>

          {
            !isLoadingOrder ?
            <FormSelect
              form={form}
              defaultValue={activeCurrency || ''}
              value={activeCurrency || ''}
              name="currency"
              label="Currency"
              onChange={(event: any) => setActiveCurrency(event.target.value as string)}
            >
              {
                currencies.map((asset, i) =>
                  <MenuItem key={i.toString()} value={asset.symbol}>
                    <img style={{maxHeight: 20, maxWidth: 20, marginRight: 15}} src={asset.logoURI} alt=""/>
                    {asset.name}
                    <span style={{marginLeft: "auto"}}>
                      (balance {asset.walletBalance || ''})
                    </span>
                  </MenuItem>
                )
              }
            </FormSelect>
              : 'Loading...'
          }

					<Box>
						<FormSubmit
							form={form}
							label="Submit"
							state={resultToState(result.type)}
							disabled={disabled}
						/>
					</Box>
				</Stack>
			</form>
			<Box sx={{ my: 2 }}>
				<RequestResult result={result}/>
			</Box>
		</>
	)
}
