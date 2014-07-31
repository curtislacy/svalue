Market Depth and Liquidity
==============

This package contains tools for calculating the market depth on exchanges for cryptoassets, and for estimating the liquidity of those assets.

Example
==============

Run ```node market.js``` in order to download data and perform some simple analysis.  What follows is the output when I ran the tool today, along with some brief analysis.

``bash
Crispin:svalue cmlacy$ node ./market.js 
1/10 oz Gold Eagle Sale Market
0 GOLDDTT: 0 BTC
1 GOLDDTT: 0.2350624783420734 BTC
2 GOLDDTT: 0.4602736208625289 BTC
3 GOLDDTT: 0.5899404916553476 BTC
4 GOLDDTT: 0.5910406245272908 BTC
5 GOLDDTT: 0.5921406580970592 BTC
6 GOLDDTT: 0.5932406580970592 BTC
7 GOLDDTT: 0.5938372703611292 BTC
8 GOLDDTT: 0.5939700203611292 BTC
9 GOLDDTT: 0.5941027703611292 BTC
10 GOLDDTT: 0.5942355203611293 BTC
``
This is a simple market depth examination.  Suppose you have 10 GOLDDTT tokens, representing 10 1/10oz Gold Eagle coins.  The spot price for gold would place their value somewhere around 2.5BTC, but these tokens are only currently traded on Poloniex, which results in a relatively shallow market.  As we see above, there are really only enough open orders to make it worth selling 2 or 3 of the tokens at this time.  Beyond that, the only buy orders active in the market are for very low prices.  While we COULD sell our tokens, they would command a very low price.
``bash
MaidSafeCoin Sale Markets
1 MAID: 0.0000435 BTC(MX), 0.00004417 BTC(PX)
2 MAID: 0.000087 BTC(MX), 0.00008834 BTC(PX)
4 MAID: 0.000174 BTC(MX), 0.00017668 BTC(PX)
8 MAID: 0.000348 BTC(MX), 0.00035336 BTC(PX)
16 MAID: 0.000696 BTC(MX), 0.00070672 BTC(PX)
32 MAID: 0.001392 BTC(MX), 0.00141344 BTC(PX)
64 MAID: 0.002784 BTC(MX), 0.00282688 BTC(PX)
128 MAID: 0.005563 BTC(MX), 0.00560864 BTC(PX)
256 MAID: 0.011099000000000001 BTC(MX), 0.01113882 BTC(PX)
512 MAID: 0.022171 BTC(MX), 0.02219802 BTC(PX)
1024 MAID: 0.04430725 BTC(MX), 0.0443043 BTC(PX)
2048 MAID: 0.08854405 BTC(MX), 0.08829472 BTC(PX)
4096 MAID: 0.17701764999999997 BTC(MX), 0.17625632 BTC(PX)
8192 MAID: 0.35396485 BTC(MX), 0.35092438 BTC(PX)
16384 MAID: 0.7078592499999999 BTC(MX), 0.6932349800000001 BTC(PX)
32768 MAID: 1.4133692500000001 BTC(MX), 1.3577345499999998 BTC(PX)
65536 MAID: 2.77101825 BTC(MX), 2.67597417 BTC(PX)
131072 MAID: 5.33005857 BTC(MX), 5.08947277 BTC(PX)
262144 MAID: 10.12371329 BTC(MX), 5.20530441 BTC(PX)
``
This is a look at a token traded on two exchanges, MaidSafeCoin.  We can see that tokens command a slightly higher price on Poloniex, but only in very small amounts.  The market is much deeper on MasterXchange, so if you want to sell more tokens, that's the place to do it.  If you're just looking to liquidate a few tokens over time, you may be able to get higher returns on Poloniex.
``bash
APICoin Sale Markets
1 XAP: 1.1e-7 BTC(MX), 0.00004201 BTC(PX)
2 XAP: 2.2e-7 BTC(MX), 0.00008402 BTC(PX)
4 XAP: 4.4e-7 BTC(MX), 0.00016804 BTC(PX)
8 XAP: 8.8e-7 BTC(MX), 0.00033608 BTC(PX)
16 XAP: 0.00000176 BTC(MX), 0.000672096192857 BTC(PX)
32 XAP: 0.00000352 BTC(MX), 0.001319849478536 BTC(PX)
64 XAP: 0.00000704 BTC(MX), 0.0025084087198689 BTC(PX)
128 XAP: 0.00001408 BTC(MX), 0.004749048719868899 BTC(PX)
256 XAP: 0.00002816 BTC(MX), 0.0092303287198689 BTC(PX)
512 XAP: 0.00005632 BTC(MX), 0.018192888719868898 BTC(PX)
1024 XAP: 0.00011264 BTC(MX), 0.034659008522331 BTC(PX)
2048 XAP: 0.00022528 BTC(MX), 0.066403008522331 BTC(PX)
4096 XAP: 0.00045056 BTC(MX), 0.11524418263727391 BTC(PX)
8192 XAP: 0.00090112 BTC(MX), 0.174088856146481 BTC(PX)
16384 XAP: 0.00116384 BTC(MX), 0.18310336009367098 BTC(PX)
32768 XAP: 0.0013276800000000001 BTC(MX), 0.183754675165681 BTC(PX)
65536 XAP: 0.00165536 BTC(MX), 0.183754675165681 BTC(PX)
131072 XAP: 0.0021000000000000003 BTC(MX), 0.183754675165681 BTC(PX)
262144 XAP: 0.0021000000000000003 BTC(MX), 0.183754675165681 BTC(PX)
``
Here's the same comparison with a newer coin, APICoin.  In this case, XAP has been listed on Poloniex for some time, and the market only opened on MasterXchange yesterday.  As a result, you can sell XAP for a much higher price on Poloniex than on MasterXchange.  However, XAP is a newer coin and demand is still low, so there's not real gain in selling more than a few thousand of them.
``bash
MaidSafeCoin Arbitrage Opportunity (1)?
1 MAID: 0.00004725 BTC(MX Buy), 0.00004417 BTC(PX Sale)
2 MAID: 0.0000945 BTC(MX Buy), 0.00008834 BTC(PX Sale)
4 MAID: 0.000189 BTC(MX Buy), 0.00017668 BTC(PX Sale)
8 MAID: 0.000378 BTC(MX Buy), 0.00035336 BTC(PX Sale)
16 MAID: 0.000756 BTC(MX Buy), 0.00070672 BTC(PX Sale)
32 MAID: 0.001512 BTC(MX Buy), 0.00141344 BTC(PX Sale)
64 MAID: 0.003024 BTC(MX Buy), 0.00282688 BTC(PX Sale)
128 MAID: 0.006048 BTC(MX Buy), 0.00560864 BTC(PX Sale)
256 MAID: 0.012096 BTC(MX Buy), 0.01113882 BTC(PX Sale)
512 MAID: 0.024192 BTC(MX Buy), 0.02219802 BTC(PX Sale)
1024 MAID: 0.048384 BTC(MX Buy), 0.0443043 BTC(PX Sale)
2048 MAID: 0.096768 BTC(MX Buy), 0.08829472 BTC(PX Sale)
4096 MAID: 0.193536 BTC(MX Buy), 0.17625632 BTC(PX Sale)
8192 MAID: 0.387072 BTC(MX Buy), 0.35092438 BTC(PX Sale)
16384 MAID: 0.7744917499999999 BTC(MX Buy), 0.6932349800000001 BTC(PX Sale)
32768 MAID: 1.5494549499999999 BTC(MX Buy), 1.3577345499999998 BTC(PX Sale)
65536 MAID: 3.1016428400000002 BTC(MX Buy), 2.67597417 BTC(PX Sale)
131072 MAID: 6.214273509999999 BTC(MX Buy), 5.08947277 BTC(PX Sale)
262144 MAID: 12.463229269999998 BTC(MX Buy), 5.20530441 BTC(PX Sale)

MaidSafeCoin Arbitrage Opportunity (2)?
1 MAID: 0.0000435 BTC(MX Sale), 0.00004553 BTC(PX Buy)
2 MAID: 0.000087 BTC(MX Sale), 0.00009106 BTC(PX Buy)
4 MAID: 0.000174 BTC(MX Sale), 0.00018212 BTC(PX Buy)
8 MAID: 0.000348 BTC(MX Sale), 0.00036424 BTC(PX Buy)
16 MAID: 0.000696 BTC(MX Sale), 0.00072848 BTC(PX Buy)
32 MAID: 0.001392 BTC(MX Sale), 0.00145696 BTC(PX Buy)
64 MAID: 0.002784 BTC(MX Sale), 0.00291392 BTC(PX Buy)
128 MAID: 0.005563 BTC(MX Sale), 0.00582784 BTC(PX Buy)
256 MAID: 0.011099000000000001 BTC(MX Sale), 0.0116568 BTC(PX Buy)
512 MAID: 0.022171 BTC(MX Sale), 0.023403429999999996 BTC(PX Buy)
1024 MAID: 0.04430725 BTC(MX Sale), 0.04695542999999999 BTC(PX Buy)
2048 MAID: 0.08854405 BTC(MX Sale), 0.09405943 BTC(PX Buy)
4096 MAID: 0.17701764999999997 BTC(MX Sale), 0.18826742999999999 BTC(PX Buy)
8192 MAID: 0.35396485 BTC(MX Sale), 0.37957809 BTC(PX Buy)
16384 MAID: 0.7078592499999999 BTC(MX Sale), 0.76789854 BTC(PX Buy)
32768 MAID: 1.4133692500000001 BTC(MX Sale), 1.55433054 BTC(PX Buy)
65536 MAID: 2.77101825 BTC(MX Sale), 3.17407454 BTC(PX Buy)
131072 MAID: 5.33005857 BTC(MX Sale), 6.522292439999999 BTC(PX Buy)
262144 MAID: 10.12371329 BTC(MX Sale), 13.970709089999998 BTC(PX Buy)
``
In this last case, we take a look at both buy and sell orders on the two exchanges.  There's potentially an opportunity for immediate profit if it's possible to purchase tokens on one exchange for a price lower than they could be sold on another (though these opportunities generally pass very quickly due to automated trading systems).  Right now, we see that the purchase price for various numbers of tokens is consistently higher than the sale price for the same number of tokens on the other exchange, so no opportunity for instantaneous arbitrage exists. (Unsurprising)