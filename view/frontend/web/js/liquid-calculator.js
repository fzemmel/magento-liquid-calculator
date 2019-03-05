/**
 * @copyright Copyright (c) Felix Zemmel
 *
 * @see PROJECT_LICENSE.txt
 */

define([
    'jquery',
    'uiComponent'
], function ($, Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Felix_LiquidCalculator/liquid-calculator',
            isVisible: false,
            totalLiquidQty: 500,
            flavorPercentage: 10,
            nicBase: 20,
            nicLiquid: 6,
            liquidRatio: 0
        },

        initObservable: function () {
            this._super();

            this.observe([
                'isVisible',
                'totalLiquidQty',
                'flavorPercentage',
                'nicBase',
                'nicLiquid'
            ]);

            return this;
        },

        initialize: function() {
            this._super();

            $('body').trigger('processStart');
        },

        isLoaded: function () {
            $('body').trigger('processStop');
            this.isVisible();
        },

        // TODO FZ: Add validation for not possible cases:
        // - nicLiquid > nicBase
        // - nicBase < nicLiquid

        /**
         * Calculate ratio of nicotine between desired liquid and nicotine shots
         */
        calcLiquidRatio: function () {
            this.liquidRatio = (this.nicLiquid() / this.nicBase());

            return this.liquidRatio;
        },

        /**
         * Calculate amount of flavor
         */
        calcFlavor: function (value) {
            value = ((this.totalLiquidQty() / 100) * this.flavorPercentage()).toFixed(1);

            return value;
        },

        /**
         * Calculate amount of vg/pg base
         */
        calcBase: function (value) {

            if (this.nicBase() == this.nicLiquid()) {
                value = 0;
            } else {
                this.calcLiquidRatio();
                value = (this.totalLiquidQty() - ((this.totalLiquidQty() / 100) * this.flavorPercentage()) - (this.totalLiquidQty() * this.liquidRatio)).toFixed(1);
            }

            return value;
        },

        /**
         * Calculate amount of nicotine shots
         */
        calcNic: function (value) {
            this.calcLiquidRatio();
            value = (this.totalLiquidQty() * this.liquidRatio).toFixed(1);

            return value;
        }
    });
});
