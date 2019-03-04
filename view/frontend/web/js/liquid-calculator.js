/**
 * @copyright Copyright (c) Felix Zemmel
 *
 * @see PROJECT_LICENSE.txt
 */

define([
    'uiComponent'
], function (Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Felix_LiquidCalculator/liquid-calculator',
            totalLiquidQty: 500,
            flavorPercentage: 10,
            nicBase: 20,
            nicLiquid: 6,
            liquidRatio: 0,
            tracks: {
                totalLiquidQty: true,
                flavorPercentage: true,
                nicBase: true,
                nicLiquid: true
            }
        },

        // TODO FZ: Add validation for not possible cases:
        // - nicLiquid > nicBase
        // - nicBase < nicLiquid

        /**
         * Calculate ratio of nicotine between desired liquid and nicotine shots
         */
        calcLiquidRatio: function () {
            this.liquidRatio = (this.nicLiquid / this.nicBase).toFixed(4);
            console.log(this.liquidRatio);

            return this.liquidRatio;
        },

        /**
         * Calculate amount of flavor
         */
        calcFlavor: function () {
            return ((this.totalLiquidQty / 100) * this.flavorPercentage).toFixed(2);
        },

        /**
         * Calculate amount of vg/pg base
         */
        calcBase: function () {
            let value;

            if (this.nicBase == this.nicLiquid) {
                value = 0;
            } else {
                this.calcLiquidRatio();

                value = (this.totalLiquidQty - ((this.totalLiquidQty / 100) * this.flavorPercentage) - (this.totalLiquidQty * this.liquidRatio)).toFixed(1);
            }

            return value;
        },

        /**
         * Calculate amount of nicotine shots
         */
        calcNic: function () {
            this.calcLiquidRatio();

            return (this.totalLiquidQty * this.liquidRatio).toFixed(1);
        }
    });
});
